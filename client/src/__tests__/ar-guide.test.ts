import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { artifact } from "../content/artifact";

const readSource = (path: string): string =>
  readFileSync(new URL(path, import.meta.url), "utf8");

describe("AR placement guide", () => {
  it("walks the visitor through the flow in order", () => {
    const titles = artifact.arGuide.steps.map((step) => step.title);

    expect(titles).toHaveLength(5);
    expect(artifact.arGuide.steps[1].text).toContain("Odana Yerleştir");
    expect(artifact.arGuide.steps.every((step) => step.text.length > 0)).toBe(true);
  });

  it("names the button the AR page actually shows", () => {
    expect(readSource("../pages/ArView.tsx")).toContain("Odana Yerleştir");
  });

  it("is rendered on the home page and reachable from the AR button", () => {
    const home = readSource("../pages/Home.tsx");

    expect(home).toContain("<ArGuide />");
    expect(home).toContain(`href={\`#\${AR_GUIDE_ID}\`}`);
  });

  it("reads its copy from the content module", () => {
    const guide = readSource("../components/ArGuide.tsx");

    expect(guide).toContain("artifact.arGuide.steps.map");
    expect(guide).toContain("artifact.arGuide.tips.map");
  });
});
