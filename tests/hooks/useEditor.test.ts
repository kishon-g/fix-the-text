import { renderHook } from "@testing-library/react";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  createEditor,
} from "lexical";
import { describe, expect, it, vi } from "vitest";
import { onError, useEditor } from "@/hooks/useEditor";
import { editorTheme } from "@/lib/editorTheme";

describe("useEditor Hook", () => {
  it("logs error in onError callback", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("Sample test error");
    onError(error);
    expect(consoleSpy).toHaveBeenCalledWith("Lexical Editor Error:", error);
    consoleSpy.mockRestore();
  });

  it("returns initialConfig with expected namespace, nodes, and theme", () => {
    const { result } = renderHook(() => useEditor());
    const config = result.current.initialConfig;

    expect(config.namespace).toBe("FixTheTextComposer");
    expect(config.theme).toBe(editorTheme);
    expect(config.onError).toBe(onError);
    expect(config.nodes.length).toBeGreaterThan(0);
  });

  it("calculates character and word count correctly in handleEditorChange", () => {
    const onChangeText = vi.fn();
    const { result } = renderHook(() => useEditor({ onChangeText }));

    const editor = createEditor({
      nodes: result.current.initialConfig.nodes,
    });

    editor.update(
      () => {
        const root = $getRoot();
        const p = $createParagraphNode();
        p.append($createTextNode("Hello world from unit test"));
        root.append(p);
      },
      { discrete: true },
    );

    result.current.handleEditorChange(editor.getEditorState(), editor);

    expect(onChangeText).toHaveBeenCalledTimes(1);
    const [formatted, charCount, wordCount] = onChangeText.mock.calls[0];
    expect(formatted).toBe("Hello world from unit test");
    expect(charCount).toBe("Hello world from unit test".length);
    expect(wordCount).toBe(5);
  });

  it("handles empty text without error", () => {
    const onChangeText = vi.fn();
    const { result } = renderHook(() => useEditor({ onChangeText }));

    const editor = createEditor({
      nodes: result.current.initialConfig.nodes,
    });

    result.current.handleEditorChange(editor.getEditorState(), editor);

    expect(onChangeText).toHaveBeenCalledWith("", 0, 0);
  });
});
