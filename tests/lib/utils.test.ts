import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("utils.cn", () => {
  it("combines multiple class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional expressions and boolean flags", () => {
    const isVisible = true;
    const isHidden = false;
    expect(cn("base", isVisible && "visible", isHidden && "hidden")).toBe(
      "base visible",
    );
  });

  it("filters out falsy values like null, undefined, and empty string", () => {
    expect(cn("active", null, undefined, "", "item")).toBe("active item");
  });

  it("handles object conditionals", () => {
    expect(cn("static", { primary: true, secondary: false })).toBe(
      "static primary",
    );
  });
});
