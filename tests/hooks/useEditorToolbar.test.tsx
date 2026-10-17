import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { act, renderHook } from "@testing-library/react";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { describe, expect, it, vi } from "vitest";
import { useEditorToolbar } from "@/hooks/useEditorToolbar";

describe("useEditorToolbar Hook", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LexicalComposer
      initialConfig={{
        namespace: "TestComposer",
        onError: () => {},
      }}
    >
      {children}
    </LexicalComposer>
  );

  it("initializes with default formatting flags as false", () => {
    const { result } = renderHook(() => useEditorToolbar(), { wrapper });

    expect(result.current.isBold).toBe(false);
    expect(result.current.isItalic).toBe(false);
    expect(result.current.isStrikethrough).toBe(false);
    expect(result.current.isCode).toBe(false);
    expect(result.current.isBulletList).toBe(false);
    expect(result.current.isNumberedList).toBe(false);
    expect(result.current.isQuote).toBe(false);
  });

  it("provides callable action functions", () => {
    const { result } = renderHook(() => useEditorToolbar(), { wrapper });

    expect(typeof result.current.formatBold).toBe("function");
    expect(typeof result.current.formatItalic).toBe("function");
    expect(typeof result.current.formatStrikethrough).toBe("function");
    expect(typeof result.current.formatCode).toBe("function");
    expect(typeof result.current.toggleBulletList).toBe("function");
    expect(typeof result.current.toggleNumberedList).toBe("function");
    expect(typeof result.current.toggleQuote).toBe("function");
    expect(typeof result.current.clearFormatting).toBe("function");
    expect(typeof result.current.clearAll).toBe("function");
    expect(typeof result.current.insertEmoji).toBe("function");
  });

  it("can execute format commands without throwing", () => {
    const { result } = renderHook(() => useEditorToolbar(), { wrapper });

    expect(() => {
      act(() => {
        result.current.formatBold();
        result.current.formatItalic();
        result.current.formatStrikethrough();
        result.current.formatCode();
        result.current.toggleBulletList();
        result.current.toggleNumberedList();
        result.current.toggleQuote();
        result.current.clearFormatting();
        result.current.clearAll();
        result.current.insertEmoji("😀");
      });
    }).not.toThrow();
  });
});
