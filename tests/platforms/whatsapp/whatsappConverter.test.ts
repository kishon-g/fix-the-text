import { $createCodeNode, CodeNode } from "@lexical/code-core";
import {
  $createListItemNode,
  $createListNode,
  ListItemNode,
  ListNode,
} from "@lexical/list";
import { $createQuoteNode, HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  $createLineBreakNode,
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  createEditor,
} from "lexical";
import { describe, expect, it } from "vitest";
import { convertEditorStateToWhatsApp } from "@/lib/whatsappConverter";

function createTestEditor() {
  return createEditor({
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode],
  });
}

function updateEditor(
  editor: ReturnType<typeof createTestEditor>,
  fn: () => void,
) {
  editor.update(fn, { discrete: true });
}

describe("whatsappConverter", () => {
  it("converts empty editor to empty string", () => {
    const editor = createTestEditor();
    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("");
  });

  it("converts plain paragraph text", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const p = $createParagraphNode();
      p.append($createTextNode("Hello world"));
      root.append(p);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("Hello world");
  });

  it("converts bold formatted text to *text*", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const p = $createParagraphNode();
      const textNode = $createTextNode("Bold text");
      textNode.toggleFormat("bold");
      p.append(textNode);
      root.append(p);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("*Bold text*");
  });

  it("converts italic formatted text to _text_", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const p = $createParagraphNode();
      const textNode = $createTextNode("Italic text");
      textNode.toggleFormat("italic");
      p.append(textNode);
      root.append(p);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("_Italic text_");
  });

  it("converts strikethrough formatted text to ~text~", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const p = $createParagraphNode();
      const textNode = $createTextNode("Strike text");
      textNode.toggleFormat("strikethrough");
      p.append(textNode);
      root.append(p);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("~Strike text~");
  });

  it("converts inline code formatted text to `text`", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const p = $createParagraphNode();
      const textNode = $createTextNode("const a = 1;");
      textNode.toggleFormat("code");
      p.append(textNode);
      root.append(p);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("`const a = 1;`");
  });

  it("converts multiple inline formats with text merging", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const p = $createParagraphNode();

      const text1 = $createTextNode("Hello ");
      const bold1 = $createTextNode("brave ");
      bold1.toggleFormat("bold");
      const bold2 = $createTextNode("new ");
      bold2.toggleFormat("bold");
      const italic = $createTextNode("world");
      italic.toggleFormat("italic");

      p.append(text1, bold1, bold2, italic);
      root.append(p);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("Hello *brave new* _world_");
  });

  it("handles line breaks inside paragraphs", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const p = $createParagraphNode();
      p.append(
        $createTextNode("Line 1"),
        $createLineBreakNode(),
        $createTextNode("Line 2"),
      );
      root.append(p);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("Line 1\nLine 2");
  });

  it("converts unordered bullet lists to - prefix", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const list = $createListNode("bullet");

      const item1 = $createListItemNode();
      item1.append($createTextNode("Item one"));

      const item2 = $createListItemNode();
      item2.append($createTextNode("Item two"));

      list.append(item1, item2);
      root.append(list);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("- Item one\n- Item two");
  });

  it("converts ordered numbered lists to 1., 2. prefix", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const list = $createListNode("number");

      const item1 = $createListItemNode();
      item1.append($createTextNode("First step"));

      const item2 = $createListItemNode();
      item2.append($createTextNode("Second step"));

      list.append(item1, item2);
      root.append(list);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("1. First step\n2. Second step");
  });

  it("converts quote nodes to > prefix for each line", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const quote = $createQuoteNode();
      quote.append(
        $createTextNode("Quote line 1"),
        $createLineBreakNode(),
        $createTextNode("Quote line 2"),
      );
      root.append(quote);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("> Quote line 1\n> Quote line 2");
  });

  it("converts code block node to triple backticks", () => {
    const editor = createTestEditor();
    updateEditor(editor, () => {
      const root = $getRoot();
      const code = $createCodeNode();
      code.append($createTextNode("function test() {\n  return 42;\n}"));
      root.append(code);
    });

    const result = convertEditorStateToWhatsApp(editor);
    expect(result).toBe("```\nfunction test() {\n  return 42;\n}\n```");
  });
});
