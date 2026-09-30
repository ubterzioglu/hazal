import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const footerSource = readFileSync(
  new URL("./Footer.tsx", import.meta.url),
  "utf8"
);
const appSource = readFileSync(new URL("../App.tsx", import.meta.url), "utf8");

describe("Footer integration", () => {
  it("is still wired into the app shell", () => {
    expect(appSource).toMatch(
      /import Footer from ["']\.\/components\/Footer["']/
    );
    expect(appSource).toContain("<Footer />");
  });

  it("renders no third-party backlinks", () => {
    expect(footerSource).not.toContain("ufuksoynakliyat.com.tr");
    expect(footerSource).not.toContain("tekhurdametal.com");
    expect(footerSource).not.toContain("lionerotik.com");
  });
});
