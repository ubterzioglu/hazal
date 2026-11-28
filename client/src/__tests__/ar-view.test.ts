import { readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { QR_TARGET } from "../../../shared/qr";

const read = (relative: string) =>
  readFileSync(new URL(relative, import.meta.url), "utf8");

const arViewSource = read("../pages/ArView.tsx");
const viewerSource = read("../components/StatueViewer.tsx");
const appSource = read("../App.tsx");
const homeSource = read("../pages/Home.tsx");

describe("AR experience", () => {
  it("is where the permanent QR code lands", () => {
    expect(QR_TARGET).toBe("/ar");
    expect(appSource).toContain('<Route path="/ar" component={ArView} />');
  });

  it("offers AR on every platform Android and iOS can reach", () => {
    expect(viewerSource).toContain('"ar-modes": "webxr scene-viewer quick-look"');
    expect(viewerSource).toContain('"ar-placement": "floor"');
    expect(arViewSource).toContain("<StatueViewer enableAr");
  });

  it("serves iPhones a prebuilt USDZ with Apple's content type", () => {
    const usdz = new URL("../../public/models/maussollos.usdz", import.meta.url);

    expect(viewerSource).toContain('"ios-src": "/models/maussollos.usdz"');
    expect(statSync(usdz).size).toBeLessThan(20 * 1024 * 1024);
    expect(readFileSync(usdz).subarray(0, 2).toString()).toBe("PK");
    expect(read("../../../server/app.ts")).toContain("model/vnd.usdz+zip");
    expect(read("../../../vercel.json")).toContain("model/vnd.usdz+zip");
    expect(read("../../../.gitignore")).toContain("!client/public/models/maussollos.usdz");
  });

  it("opens the information directly from a labelled button", () => {
    expect(arViewSource).toContain("Bilgi Al");
    expect(arViewSource).toContain("<ArtifactInfo initialLanguage={language} />");
    expect(arViewSource).not.toContain("InfoFab");
  });

  it("offers English information and narration straight from the AR screen", () => {
    expect(arViewSource).toContain('<ControlRow language="tr" />');
    expect(arViewSource).toContain('<ControlRow language="en" />');
    expect(arViewSource).toContain("Info (EN)");
    expect(arViewSource).toContain("Audio (EN)");

    for (const ext of ["mp3", "wav"]) {
      const file = new URL(`../../public/audio/maussollos-description-en.${ext}`, import.meta.url);
      expect(statSync(file).size).toBeGreaterThan(100 * 1024);
    }
    expect(read("../components/AudioToggle.tsx")).toContain("/audio/maussollos-description-en");
  });

  it("lets visitors turn the audio description on and off", () => {
    expect(arViewSource).toContain("<AudioToggle");
    expect(read("../components/AudioToggle.tsx")).toContain("audio.pause()");
  });

  it("credits the CC BY model author on both pages", () => {
    for (const source of [arViewSource, homeSource]) {
      expect(source).toContain("artfletch");
      expect(source).toContain("CC BY 4.0");
    }
  });

  it("shows only the single statue, never the two-statue embed", () => {
    for (const source of [arViewSource, viewerSource, homeSource]) {
      expect(source).not.toContain("sketchfab.com/models");
    }
    expect(homeSource).toContain("<StatueViewer");
  });

  it("treats the SPA's index.html as a missing model", () => {
    expect(viewerSource).toContain('contentType.includes("text/html")');
  });

  it("links to the AR experience from the home page", () => {
    expect(homeSource).toContain('href="/ar"');
  });
});
