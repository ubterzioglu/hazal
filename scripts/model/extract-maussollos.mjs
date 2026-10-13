/**
 * Step 1 of the Maussollos AR model pipeline.
 *
 * Source: "Greek Artemisia And Maussollos Statues" by artfletch, CC BY 4.0
 *   https://sketchfab.com/3d-models/1f1d2b9ce3ba46e28abd4408106aa732
 *   downloaded as GLB, 4k texture (~29.5 MB, 803k triangles, two statues)
 *
 * Full pipeline (produces client/public/models/maussollos.glb):
 *   node scripts/model/extract-maussollos.mjs <source.glb> raw.glb
 *   npx @gltf-transform/cli weld     raw.glb s1.glb
 *   npx @gltf-transform/cli simplify s1.glb  s2.glb --ratio 0.42 --error 0.0015
 *   npx @gltf-transform/cli resize   s2.glb  s3.glb --width 2048 --height 2048
 *   npx @gltf-transform/cli webp     s3.glb  s4.glb --quality 86
 *   npx @gltf-transform/cli prune    s4.glb  maussollos.glb --keep-attributes true
 *
 * --keep-attributes is not optional: prune otherwise strips NORMAL, and the
 * marble renders flat-shaded and faceted.
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";

const SRC = process.argv[2];
const DST = process.argv[3];
// The scan is a single material split into eight arbitrary geometry chunks, so
// the two statues cannot be separated by node — the cut has to be spatial.
// Measured from the source file before choosing these numbers:
//   Y < -3.80  a floor slab spanning the full 8.79-unit scene width (191k tris)
//   X < -0.40  the second, shorter figure (Artemisia)
// The kept figure is 12% taller than the discarded one, matching the real
// statues' 3.00 m / 2.67 m ratio, which is how we know it is Maussollos.
const KEEP_X_ABOVE = -0.4;
const KEEP_Y_ABOVE = -3.8;
const TARGET_HEIGHT_M = 3.0;

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(SRC);
const root = doc.getRoot();

const apply = (m, [x, y, z]) => [
  m[0] * x + m[4] * y + m[8] * z + m[12],
  m[1] * x + m[5] * y + m[9] * z + m[13],
  m[2] * x + m[6] * y + m[10] * z + m[14],
];
const applyDir = (m, [x, y, z]) => {
  const o = [m[0] * x + m[4] * y + m[8] * z, m[1] * x + m[5] * y + m[9] * z, m[2] * x + m[6] * y + m[10] * z];
  const len = Math.hypot(o[0], o[1], o[2]) || 1;
  return [o[0] / len, o[1] / len, o[2] / len];
};

let kept = 0, dropped = 0;
const bounds = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };

for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  if (!mesh) continue;
  const m = node.getWorldMatrix();
  const scale = node.getWorldScale();
  if (Math.abs(scale[0] - scale[1]) > 1e-4 || Math.abs(scale[0] - scale[2]) > 1e-4) {
    console.warn("UYARI: non-uniform scale, normaller bozulabilir:", scale);
  }

  for (const prim of mesh.listPrimitives()) {
    const posAcc = prim.getAttribute("POSITION");
    const norAcc = prim.getAttribute("NORMAL");
    const uvAcc = prim.getAttribute("TEXCOORD_0");
    const idx = prim.getIndices().getArray();
    const pos = posAcc.getArray();
    const nor = norAcc ? norAcc.getArray() : null;
    const uv = uvAcc ? uvAcc.getArray() : null;

    // World-space positions, computed once per vertex.
    const world = new Float32Array(pos.length);
    for (let v = 0; v < pos.length / 3; v++) {
      const p = apply(m, [pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]]);
      world[v * 3] = p[0]; world[v * 3 + 1] = p[1]; world[v * 3 + 2] = p[2];
    }

    const remap = new Int32Array(pos.length / 3).fill(-1);
    const newPos = [], newNor = [], newUv = [], newIdx = [];

    for (let i = 0; i < idx.length; i += 3) {
      const a = idx[i], b = idx[i + 1], c = idx[i + 2];
      const cxv = (world[a * 3] + world[b * 3] + world[c * 3]) / 3;
      const cyv = (world[a * 3 + 1] + world[b * 3 + 1] + world[c * 3 + 1]) / 3;
      if (cxv <= KEEP_X_ABOVE || cyv <= KEEP_Y_ABOVE) { dropped++; continue; }
      kept++;
      for (const v of [a, b, c]) {
        if (remap[v] === -1) {
          remap[v] = newPos.length / 3;
          const p = [world[v * 3], world[v * 3 + 1], world[v * 3 + 2]];
          newPos.push(...p);
          for (let k = 0; k < 3; k++) {
            bounds.min[k] = Math.min(bounds.min[k], p[k]);
            bounds.max[k] = Math.max(bounds.max[k], p[k]);
          }
          if (nor) newNor.push(...applyDir(m, [nor[v * 3], nor[v * 3 + 1], nor[v * 3 + 2]]));
          if (uv) newUv.push(uv[v * 2], uv[v * 2 + 1]);
        }
        newIdx.push(remap[v]);
      }
    }

    if (!newIdx.length) {
      mesh.removePrimitive(prim);
      prim.dispose();
      continue;
    }
    posAcc.setArray(new Float32Array(newPos));
    if (norAcc) norAcc.setArray(new Float32Array(newNor));
    if (uvAcc) uvAcc.setArray(new Float32Array(newUv));
    prim.getIndices().setArray(new Uint32Array(newIdx));
  }

}

// Geometry is baked into world space, so EVERY node transform — including the
// parent that carries the scan's 180-degree X rotation — has to be cleared.
// Clearing only the mesh nodes leaves the parent rotating the statue back.
const IDENTITY = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
for (const n of root.listNodes()) n.setMatrix(IDENTITY);

const size = bounds.max.map((v, i) => v - bounds.min[i]);
const scale = TARGET_HEIGHT_M / size[1];
console.log(`tutulan ucgen : ${kept.toLocaleString()}`);
console.log(`atilan ucgen  : ${dropped.toLocaleString()}`);
console.log(`ham bbox      : ${size.map((v) => v.toFixed(2)).join(" x ")}`);
console.log(`olcek katsayisi: ${scale.toFixed(5)}  -> ${(size[0]*scale).toFixed(2)} x ${(size[1]*scale).toFixed(2)} x ${(size[2]*scale).toFixed(2)} m`);

// Centre on the floor at the origin, then scale to real-world metres, so
// ar-placement="floor" stands the statue on the ground at true size.
const cx = (bounds.min[0] + bounds.max[0]) / 2;
const cz = (bounds.min[2] + bounds.max[2]) / 2;
const floor = bounds.min[1];
for (const mesh of root.listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const acc = prim.getAttribute("POSITION");
    const arr = acc.getArray();
    for (let v = 0; v < arr.length / 3; v++) {
      arr[v * 3] = (arr[v * 3] - cx) * scale;
      arr[v * 3 + 1] = (arr[v * 3 + 1] - floor) * scale;
      arr[v * 3 + 2] = (arr[v * 3 + 2] - cz) * scale;
    }
    acc.setArray(arr);
  }
}

await io.write(DST, doc);
console.log(`yazildi: ${DST}`);
