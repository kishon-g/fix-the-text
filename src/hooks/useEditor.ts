"use client";

import { useCallback, useMemo } from "react";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code-core";
import { $getRoot, type LexicalEditor } from "lexical";
import { convertEditorStateToWhatsApp } from "@/lib/whatsappConverter";
import { editorTheme } from "@/lib/editorTheme";

export function onError(error: Error) {
  console.error("Lexical Editor Error:", error);
}

export interface UseEditorOptions {
  onChangeText?: (
    whatsappText: string,
    charCount: number,
    wordCount: number,
  ) => void;
}

export function useEditor(options?: UseEditorOptions) {
  const { onChangeText } = options || {};

  const initialConfig = useMemo(
    () => ({
      namespace: "FixTheTextComposer",
      theme: editorTheme,
      onError,
      nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode],
    }),
    [],
  );

  const handleEditorChange = useCallback(
    (_editorState: unknown, editor: LexicalEditor) => {
      if (!onChangeText) return;

      const formatted = convertEditorStateToWhatsApp(editor);
      let plainText = "";
      editor.getEditorState().read(() => {
        plainText = $getRoot().getTextContent();
      });

      const charCount = plainText.length;
      const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;

      onChangeText(formatted, charCount, words);
    },
    [onChangeText],
  );

  return {
    initialConfig,
    handleEditorChange,
  };
}
