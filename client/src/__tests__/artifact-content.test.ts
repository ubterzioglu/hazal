import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { artifact } from "../content/artifact";

const homeSource = readFileSync(
  new URL("../pages/Home.tsx", import.meta.url),
  "utf8"
);

describe("artifact copy", () => {
  it('labels the findspot "Buluntu Yeri", not "Orijin"', () => {
    expect(artifact.facts.map((f) => f.label)).toContain("Buluntu Yeri");
    expect(artifact.facts.map((f) => f.label)).not.toContain("Orijin");
    expect(homeSource).not.toContain("Orijin");
  });

  it("carries museum, period and location inside the details card", () => {
    expect(artifact.details.provenance.map((p) => p.label)).toEqual([
      "Müze",
      "Dönem",
      "Konum",
    ]);
    expect(artifact.details.provenance[0].note).toBe("Yunan ve Roma Departmanı");
    expect(homeSource).toContain("artifact.details.provenance.map");
  });

  it("no longer renders the standalone block at the bottom of the page", () => {
    expect(homeSource).not.toContain("Alt Bilgi");
    expect(homeSource).not.toContain("British Museum, Londra");
    expect(homeSource).not.toContain("Bodrum, Türkiye");
  });

  it("keeps the copy out of the layout so it can be handed over for editing", () => {
    expect(homeSource).toContain("{artifact.details.about}");
    expect(homeSource).toContain("artifact.facts.map");
  });
});
