import { statSync } from "node:fs";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const modelUrl = new URL("../../public/models/maussollos.glb", import.meta.url);
const arViewSource = readFileSync(
  new URL("../pages/ArView.tsx", import.meta.url),
  "utf8"
);

describe("AR model asset", () => {
  it("is where ArView looks for it", () => {
    expect(arViewSource).toContain('"/models/maussollos.glb"');
    expect(() => statSync(modelUrl)).not.toThrow();
  });

  it("stays inside the mobile download budget", () => {
    const mb = statSync(modelUrl).size / 1024 / 1024;
    // Museum visitors load this over mobile data, standing in a gallery.
    expect(mb).toBeLessThan(8);
  });

  it("is a binary glTF, not an SPA fallback page", () => {
    // The catch-all serves index.html for missing files; a committed HTML blob
    // here would pass a naive existence check and fail only on a real device.
    const magic = readFileSync(modelUrl).subarray(0, 4).toString("ascii");
    expect(magic).toBe("glTF");
  });
});
