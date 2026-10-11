import { describe, expect, it } from "vitest";
import { editorTheme } from "@/lib/editorTheme";

describe("editorTheme", () => {
  it("defines CSS classes for paragraph", () => {
    expect(editorTheme.paragraph).toContain("leading-relaxed");
  });

  it("defines CSS classes for quote", () => {
    expect(editorTheme.quote).toContain("border-l-2");
    expect(editorTheme.quote).toContain("italic");
  });

  it("defines list configuration for unordered, ordered and items", () => {
    expect(editorTheme.list?.ul).toContain("list-disc");
    expect(editorTheme.list?.ol).toContain("list-decimal");
    expect(editorTheme.list?.listitem).toBe("pl-1");
  });

  it("defines inline text styles for bold, italic, strikethrough, and code", () => {
    expect(editorTheme.text?.bold).toContain("font-bold");
    expect(editorTheme.text?.italic).toBe("italic");
    expect(editorTheme.text?.strikethrough).toContain("line-through");
    expect(editorTheme.text?.code).toContain("font-mono");
  });
});
