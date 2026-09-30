import { readFileSync } from "node:fs";
import { AddressInfo } from "node:net";
import { describe, expect, it } from "vitest";
import { QR_PATH, QR_TARGET } from "../../../shared/qr";
import { createApp } from "../../../server/app";
import { QR_PAYLOAD, decodeQrPng } from "../../../scripts/generate-qr.mjs";

const qrPngPath = new URL("../../public/qr-code.png", import.meta.url);

describe("permanent QR code", () => {
  it("encodes the permanent /qr entry point, not a page path", () => {
    expect(QR_PAYLOAD).toBe("https://hazaloral.site/qr");
    expect(decodeQrPng(qrPngPath)).toBe(QR_PAYLOAD);
  });

  it("redirects /qr with a 302 so the target stays changeable", async () => {
    const server = createApp().listen(0);
    try {
      const { port } = server.address() as AddressInfo;
      const response = await fetch(`http://127.0.0.1:${port}${QR_PATH}`, {
        redirect: "manual",
      });
      expect(response.status).toBe(302);
      expect(response.headers.get("location")).toBe(QR_TARGET);
    } finally {
      server.close();
    }
  });

  it("mirrors the redirect in vercel.json as a non-permanent rule", () => {
    const vercel = JSON.parse(
      readFileSync(new URL("../../../vercel.json", import.meta.url), "utf8")
    );
    const rule = vercel.redirects?.find((r: { source: string }) => r.source === QR_PATH);
    expect(rule).toBeDefined();
    expect(rule.destination).toBe(QR_TARGET);
    // A 301 would be cached by browsers forever and freeze the target.
    expect(rule.permanent).toBe(false);
  });
});
