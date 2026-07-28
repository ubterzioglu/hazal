import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const footerSource = readFileSync(
  new URL("./Footer.tsx", import.meta.url),
  "utf8"
);
const appSource = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");

describe("Footer integration", () => {
  it("renders the footer globally", () => {
    expect(appSource).toMatch(
      /import Footer from ["']\.\/components\/Footer["']/
    );
    expect(appSource).toContain("<Footer />");
  });

  it("shows all three backlink entries at exactly 8px", () => {
    expect(footerSource).toContain("text-[8px]");
    expect(footerSource).toContain("Kartal Evden Eve Nakliyat");
    expect(footerSource).toContain("Demir Hurda Fiyatları");
    expect(footerSource).toContain("Antalya Seks Shop");
  });
});
