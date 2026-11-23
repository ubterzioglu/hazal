import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { artifact } from "../content/artifact";

const read = (path: string): string =>
  readFileSync(new URL(path, import.meta.url), "utf8");

const visibleSources = [
  "../../index.html",
  "../content/artifact.ts",
  "../pages/Home.tsx",
  "../pages/ArView.tsx",
  "../pages/Methodology.tsx",
  "../content/methodology.ts",
  "../components/ArtifactInfo.tsx",
];

describe("artifact copy", () => {
  it("uses Hazal's label set in Turkish and English", () => {
    expect(artifact.info.tr.facts.map((fact) => fact.label)).toEqual([
      "İsim",
      "Yıl",
      "Ölçüler",
      "Ait Olduğu Yer",
      "Yitirildiği Yıl",
      "Götürüldüğü Yer",
    ]);
    expect(artifact.info.en.facts.map((fact) => fact.label)).toEqual([
      "Name",
      "Date",
      "Dimensions",
      "Place of Origin",
      "Year of Loss",
      "Taken to",
    ]);
  });

  it("dates the statue as approximate", () => {
    expect(artifact.info.tr.facts[1].value).toBe("MÖ 350 Civarı");
    expect(artifact.info.en.facts[1].value).toBe("Circa 350 BC");
  });

  it("never frames the statue as Greek or Classical", () => {
    const paths = [...visibleSources, "../../public/og-image.svg"];
    for (const path of paths) {
      expect(read(path), path).not.toMatch(/yunan|klasik|greek/i);
    }
  });

  it("uses the agreed spelling on every visitor-facing page", () => {
    for (const path of visibleSources) {
      const source = read(path);
      expect(source, path).not.toContain("Maussollos");
      expect(source, path).not.toContain("Mausolesi");
      expect(source, path).not.toContain("M.Ö. 350");
    }
  });

  it("describes the model's real source in the methodology", () => {
    const copy = read("../content/methodology.ts");
    expect(copy).toContain("yeniden taranmadı");
    expect(copy).toContain("artfletch");
    expect(copy).toContain("CC BY 4.0");
    expect(read("../pages/Methodology.tsx")).not.toMatch(/manus|Akademik Araştırma/i);
  });

  it("keeps the copy out of the layout so it can be handed over for editing", () => {
    const info = read("../components/ArtifactInfo.tsx");
    expect(info).toContain("artifact.info[language]");
    expect(info).toContain("copy.facts.map");
  });
});
