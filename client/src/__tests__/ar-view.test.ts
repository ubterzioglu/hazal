import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QR_TARGET } from "../../../shared/qr";

const read = (relative: string) =>
  readFileSync(new URL(relative, import.meta.url), "utf8");

const arViewSource = read("../pages/ArView.tsx");
const appSource = read("../App.tsx");
const homeSource = read("../pages/Home.tsx");

describe("AR experience", () => {
  it("is where the permanent QR code lands", () => {
    expect(QR_TARGET).toBe("/ar");
    expect(appSource).toContain('<Route path="/ar" component={ArView} />');
  });

  it("offers AR on every platform Android and iOS can reach", () => {
    expect(arViewSource).toContain('ar-modes="webxr scene-viewer quick-look"');
    expect(arViewSource).toContain('ar-placement="floor"');
    // No ios-src on purpose: model-viewer generates the USDZ for Quick Look.
    expect(arViewSource).not.toContain("ios-src");
  });

  it("shows the info button that leads back to the main site", () => {
    expect(arViewSource).toContain("<InfoFab />");
    expect(read("../components/InfoFab.tsx")).toContain('href="/"');
  });

  it("credits the CC BY model author", () => {
    expect(arViewSource).toContain("artfletch");
    expect(arViewSource).toContain("CC BY 4.0");
  });

  it("falls back instead of showing a broken page when the model is missing", () => {
    expect(arViewSource).toContain("sketchfab.com/models");
    // A 200 + index.html from the SPA catch-all must not count as a real model.
    expect(arViewSource).toContain('contentType.includes("text/html")');
  });

  it("links to the AR experience from the home page", () => {
    expect(homeSource).toContain('href="/ar"');
  });
});
