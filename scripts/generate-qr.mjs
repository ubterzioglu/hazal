/**
 * Regenerates the printed QR code and verifies it by decoding the result.
 *
 * The QR target is permanent: it encodes https://hazaloral.site/qr, which the
 * server 302-redirects to wherever the experience currently lives. Moving the
 * experience must never require reprinting the code, so DO NOT point this at a
 * page path (/ar, /) — change server/app.ts QR_TARGET instead.
 *
 * Usage:
 *   pnpm qr:generate    regenerate + verify
 *   pnpm qr:verify      verify the committed PNG only
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import QRCode from "qrcode";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const QR_PAYLOAD = "https://hazaloral.site/qr";
export const QR_PNG_PATH = path.resolve(__dirname, "..", "client", "public", "qr-code.png");

/** Decodes a QR PNG from disk and returns the embedded text. */
export function decodeQrPng(pngPath) {
  const png = PNG.sync.read(readFileSync(pngPath));
  const result = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  if (!result) {
    throw new Error(`Could not decode a QR code from ${pngPath}`);
  }
  return result.data;
}

async function generate() {
  // Error correction level H (~30% recoverable) so the code survives print
  // wear, glare and partial occlusion on a museum label.
  await QRCode.toFile(QR_PNG_PATH, QR_PAYLOAD, {
    errorCorrectionLevel: "H",
    type: "png",
    width: 1024,
    margin: 2,
    color: { dark: "#0f172aff", light: "#ffffffff" },
  });
  console.log(`Wrote ${QR_PNG_PATH}`);
}

function verify() {
  const decoded = decodeQrPng(QR_PNG_PATH);
  if (decoded !== QR_PAYLOAD) {
    throw new Error(`QR payload mismatch.\n  expected: ${QR_PAYLOAD}\n  decoded:  ${decoded}`);
  }
  console.log(`Verified by decoding: ${decoded}`);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const verifyOnly = process.argv.includes("--verify");
  if (!verifyOnly) {
    await generate();
  }
  verify();
}
