/**
 * Builds the iPhone AR file from the GLB:
 *   node scripts/model/export-usdz.mjs <chrome-executable>
 *
 * USDZ stores geometry as text, so the exporter's number format decides the
 * download size. Four significant digits keep about 1 mm accuracy at this scale.
 * The export runs inside headless Chrome because three's USDZExporter needs a
 * real canvas to decode the WebP texture. The result is one mesh, so Quick Look
 * does not have to generate and assemble seven chunks on the phone.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const GLB_PATH = resolve(process.argv[3] ?? join(ROOT, "client/public/models/maussollos.glb"));
const USDZ_PATH = join(ROOT, "client/public/models/maussollos.usdz");
const TIMEOUT_MS = 180_000;
// A 3 m statue opens around the viewer in Quick Look and looks like nothing
// arrived. Half size lands fully in frame; visitors can pinch it larger.
const DISPLAY_SCALE = 0.5;

const chromePath = process.argv[2];
if (!chromePath) throw new Error("Usage: node scripts/model/export-usdz.mjs <chrome-executable>");

// pnpm keeps three beside model-viewer, so resolve it from model-viewer's real path.
const viewerDir = realpathSync(join(ROOT, "node_modules/@google/model-viewer"));
const threeDir = dirname(dirname(createRequire(join(viewerDir, "package.json")).resolve("three")));
const esbuild = createRequire(join(ROOT, "package.json"))("esbuild");

const entry = `
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { USDZExporter } from "three/examples/jsm/exporters/USDZExporter.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

try {
  const { scene: source } = await new GLTFLoader().loadAsync("/model.glb");
  source.updateMatrixWorld(true);
  const parts = [];
  let map = null;
  source.traverse((node) => {
    if (!node.isMesh) return;
    parts.push(node.geometry.clone().applyMatrix4(node.matrixWorld));
    map = node.material.map;
  });
  const geometry = mergeGeometries(parts, false);
  geometry.scale(${DISPLAY_SCALE}, ${DISPLAY_SCALE}, ${DISPLAY_SCALE});
  const material = new THREE.MeshStandardMaterial({ map, roughness: 1, metalness: 0, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "Mausolos";
  const scene = new THREE.Scene();
  scene.add(mesh);
  scene.updateMatrixWorld(true);
  const usdz = await new USDZExporter().parseAsync(scene, { quickLookCompatible: true, maxTextureSize: 1536 });
  await fetch("/result", { method: "POST", body: usdz });
} catch (error) {
  await fetch("/failure", { method: "POST", body: String(error?.stack ?? error) });
}
`;

const compactNumbers = {
  name: "compact-usdz-numbers",
  setup(build) {
    build.onLoad({ filter: /USDZExporter\.js$/ }, ({ path }) => {
      const source = readFileSync(path, "utf8");
      const uvPattern = "${1 - y.toPrecision( PRECISION )}";
      if (!source.includes("const PRECISION = 7;") || !source.includes(uvPattern)) {
        throw new Error("USDZExporter changed: review the number-format patch");
      }
      return {
        loader: "js",
        contents: source
          .replace("const PRECISION = 7;", "const PRECISION = 4;")
          .replace(uvPattern, "${( 1 - y ).toPrecision( PRECISION )}"),
      };
    });
  },
};

const bundle = await esbuild.build({
  stdin: { contents: entry, resolveDir: threeDir, loader: "js" },
  plugins: [compactNumbers],
  bundle: true,
  format: "esm",
  target: "es2022",
  write: false,
  logLevel: "error",
});

const readBody = async (request) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks);
};

let finish;
const finished = new Promise((res, rej) => {
  finish = { res, rej };
  setTimeout(() => rej(new Error("USDZ export timed out")), TIMEOUT_MS).unref();
});

const server = createServer(async (request, response) => {
  if (request.url === "/") {
    response.setHeader("content-type", "text/html");
    return response.end('<!doctype html><script type="module" src="/export.js"></script>');
  }
  if (request.url === "/export.js") {
    response.setHeader("content-type", "text/javascript");
    return response.end(bundle.outputFiles[0].contents);
  }
  if (request.url === "/model.glb") {
    response.setHeader("content-type", "model/gltf-binary");
    return response.end(readFileSync(GLB_PATH));
  }
  if (request.url === "/result") {
    const body = await readBody(request);
    response.end("ok");
    return finish.res(body);
  }
  if (request.url === "/failure") {
    const body = await readBody(request);
    response.end("ok");
    return finish.rej(new Error(body.toString()));
  }
  response.statusCode = 404;
  return response.end();
});
await new Promise((res) => server.listen(0, "127.0.0.1", res));

const profile = mkdtempSync(join(tmpdir(), "usdz-export-"));
const browser = spawn(chromePath, [
  "--headless=new",
  "--no-first-run",
  `--user-data-dir=${profile}`,
  `http://127.0.0.1:${server.address().port}/`,
], { stdio: "ignore" });

try {
  const usdz = await finished;
  writeFileSync(USDZ_PATH, usdz);
  console.log(`written: ${USDZ_PATH} (${(usdz.length / 1024 / 1024).toFixed(2)} MB)`);
} finally {
  browser.kill();
  server.close();
  await new Promise((res) => setTimeout(res, 1500));
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 400 });
  } catch (error) {
    // Chrome can hold the temp profile briefly on Windows; the USDZ is already written.
    console.warn(`Could not remove temp profile ${profile}: ${error.message}`);
  }
}
