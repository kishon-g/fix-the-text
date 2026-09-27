"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from "lexical"
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
} from "@lexical/list"
import { $createQuoteNode, $isQuoteNode } from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  RemoveFormatting,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function EditorToolbar() {
  const [editor] = useLexicalComposerContext()
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [isBulletList, setIsBulletList] = useState(false)
  const [isNumberedList, setIsNumberedList] = useState(false)
  const [isQuote, setIsQuote] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsCode(selection.hasFormat("code"))

      const anchorNode = selection.anchor.getNode()
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow()

      if ($isListNode(element)) {
        const parentList = element
        const listType = parentList.getListType()
        setIsBulletList(listType === "bullet")
        setIsNumberedList(listType === "number")
        setIsQuote(false)
      } else {
        setIsBulletList(false)
        setIsNumberedList(false)
        setIsQuote($isQuoteNode(element))
      }
    }
  }, [])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar()
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, updateToolbar])

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar()
      })
    })
  }, [editor, updateToolbar])

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
  }

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
  }

  const formatStrikethrough = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
  }

  const formatCode = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
  }

  const toggleBulletList = () => {
    if (isBulletList) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    }
  }

  const toggleNumberedList = () => {
    if (isNumberedList) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    }
  }

  const toggleQuote = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        if (isQuote) {
          $setBlocksType(selection, () => $createParagraphNode())
        } else {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      }
    })
  }

  const clearFormatting = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        if (selection.hasFormat("bold")) selection.toggleFormat("bold")
        if (selection.hasFormat("italic")) selection.toggleFormat("italic")
        if (selection.hasFormat("strikethrough")) selection.toggleFormat("strikethrough")
        if (selection.hasFormat("code")) selection.toggleFormat("code")

        $setBlocksType(selection, () => $createParagraphNode())
      }
    })

    if (isBulletList || isNumberedList) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  return (
    <TooltipProvider delay={200}>
      <div className="flex flex-wrap items-center gap-1 rounded-t-xl border-b border-border/80 bg-muted/30 p-2 text-foreground">
        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant={isBold ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={formatBold}
              aria-label="Bold (*text*)"
              className={isBold ? "bg-accent font-bold text-foreground" : ""}
            >
              <Bold className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Bold</span>
            <span className="ml-1 text-[10px] opacity-70">*text* (Ctrl+B)</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant={isItalic ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={formatItalic}
              aria-label="Italic (_text_)"
              className={isItalic ? "bg-accent text-foreground" : ""}
            >
              <Italic className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Italic</span>
            <span className="ml-1 text-[10px] opacity-70">_text_ (Ctrl+I)</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant={isStrikethrough ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={formatStrikethrough}
              aria-label="Strikethrough (~text~)"
              className={isStrikethrough ? "bg-accent text-foreground" : ""}
            >
              <Strikethrough className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Strikethrough</span>
            <span className="ml-1 text-[10px] opacity-70">~text~</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant={isCode ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={formatCode}
              aria-label="Monospace (`text`)"
              className={isCode ? "bg-accent text-foreground font-mono" : ""}
            >
              <Code className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Monospace</span>
            <span className="ml-1 text-[10px] opacity-70">`text`</span>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-5" />

        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant={isBulletList ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={toggleBulletList}
              aria-label="Bullet list (- item)"
              className={isBulletList ? "bg-accent text-foreground" : ""}
            >
              <List className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Bullet List</span>
            <span className="ml-1 text-[10px] opacity-70">- item</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant={isNumberedList ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={toggleNumberedList}
              aria-label="Numbered list (1. item)"
              className={isNumberedList ? "bg-accent text-foreground" : ""}
            >
              <ListOrdered className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Numbered List</span>
            <span className="ml-1 text-[10px] opacity-70">1. item</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant={isQuote ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={toggleQuote}
              aria-label="Quote (> text)"
              className={isQuote ? "bg-accent text-foreground" : ""}
            >
              <Quote className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Quote</span>
            <span className="ml-1 text-[10px] opacity-70">&gt; text</span>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-5" />

        <Tooltip>
          <TooltipTrigger>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={clearFormatting}
              aria-label="Clear formatting"
              className="text-muted-foreground hover:text-foreground"
            >
              <RemoveFormatting className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Clear formatting</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
