"use client";

import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createQuoteNode, $isQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

export interface EditorToolbarState {
  // Format States
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
  isBulletList: boolean;
  isNumberedList: boolean;
  isQuote: boolean;

  // Actions
  formatBold: () => void;
  formatItalic: () => void;
  formatStrikethrough: () => void;
  formatCode: () => void;
  toggleBulletList: () => void;
  toggleNumberedList: () => void;
  toggleQuote: () => void;
  clearFormatting: () => void;
  clearAll: () => void;
  insertEmoji: (emoji: string) => void;
}

export function useEditorToolbar(): EditorToolbarState {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);
  const [isQuote, setIsQuote] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      if ($isListNode(element)) {
        const parentList = element;
        const listType = parentList.getListType();
        setIsBulletList(listType === "bullet");
        setIsNumberedList(listType === "number");
        setIsQuote(false);
      } else {
        setIsBulletList(false);
        setIsNumberedList(false);
        setIsQuote($isQuoteNode(element));
      }
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  }, [editor]);

  const formatItalic = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  }, [editor]);

  const formatStrikethrough = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
  }, [editor]);

  const formatCode = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
  }, [editor]);

  const toggleBulletList = useCallback(() => {
    if (isBulletList) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  }, [editor, isBulletList]);

  const toggleNumberedList = useCallback(() => {
    if (isNumberedList) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  }, [editor, isNumberedList]);

  const toggleQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (isQuote) {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      }
    });
  }, [editor, isQuote]);

  const clearFormatting = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (selection.hasFormat("bold")) selection.toggleFormat("bold");
        if (selection.hasFormat("italic")) selection.toggleFormat("italic");
        if (selection.hasFormat("strikethrough"))
          selection.toggleFormat("strikethrough");
        if (selection.hasFormat("code")) selection.toggleFormat("code");

        $setBlocksType(selection, () => $createParagraphNode());
      }
    });

    if (isBulletList || isNumberedList) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [editor, isBulletList, isNumberedList]);

  const clearAll = useCallback(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const p = $createParagraphNode();
      root.append(p);
      p.select();
    });
  }, [editor]);

  const insertEmoji = useCallback(
    (emoji: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.insertText(emoji);
        } else {
          const root = $getRoot();
          let lastChild = root.getLastChild();
          if (!lastChild || !$isParagraphNode(lastChild)) {
            const p = $createParagraphNode();
            root.append(p);
            lastChild = p;
          }
          lastChild.selectEnd();
          const newSelection = $getSelection();
          if ($isRangeSelection(newSelection)) {
            newSelection.insertText(emoji);
          }
        }
      });
    },
    [editor],
  );

  return {
    isBold,
    isItalic,
    isStrikethrough,
    isCode,
    isBulletList,
    isNumberedList,
    isQuote,
    formatBold,
    formatItalic,
    formatStrikethrough,
    formatCode,
    toggleBulletList,
    toggleNumberedList,
    toggleQuote,
    clearFormatting,
    clearAll,
    insertEmoji,
  };
}
