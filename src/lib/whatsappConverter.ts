import {
  $getRoot,
  $isElementNode,
  $isLineBreakNode,
  $isTextNode,
  type LexicalEditor,
  type LexicalNode,
} from "lexical"
import { $isListNode, $isListItemNode } from "@lexical/list"
import { $isQuoteNode } from "@lexical/rich-text"
import { $isCodeNode } from "@lexical/code-core"

interface FormatFlags {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  code: boolean
}

interface InlineToken {
  text: string
  flags: FormatFlags
}

function getFlagsFromNode(node: LexicalNode): FormatFlags {
  if ($isTextNode(node)) {
    return {
      bold: node.hasFormat("bold"),
      italic: node.hasFormat("italic"),
      strikethrough: node.hasFormat("strikethrough"),
      code: node.hasFormat("code"),
    }
  }
  return { bold: false, italic: false, strikethrough: false, code: false }
}

function areFlagsEqual(a: FormatFlags, b: FormatFlags): boolean {
  return (
    a.bold === b.bold &&
    a.italic === b.italic &&
    a.strikethrough === b.strikethrough &&
    a.code === b.code
  )
}

function hasAnyFlag(flags: FormatFlags): boolean {
  return flags.bold || flags.italic || flags.strikethrough || flags.code
}

function formatTokenText(text: string, flags: FormatFlags): string {
  if (!text || !hasAnyFlag(flags)) {
    return text
  }

  const match = text.match(/^(\s*)([\s\S]*?)(\s*)$/)
  if (!match) return text

  const [, leadingSpace, content, trailingSpace] = match

  if (!content) {
    return text
  }

  let formatted = content

  if (flags.code) {
    formatted = "`" + formatted + "`"
  } else {
    if (flags.strikethrough) {
      formatted = "~" + formatted + "~"
    }
    if (flags.italic) {
      formatted = "_" + formatted + "_"
    }
    if (flags.bold) {
      formatted = "*" + formatted + "*"
    }
  }

  return leadingSpace + formatted + trailingSpace
}

function processInlineNodes(nodes: LexicalNode[]): string {
  const rawTokens: InlineToken[] = []

  for (const node of nodes) {
    if ($isTextNode(node)) {
      const text = node.getTextContent()
      const flags = getFlagsFromNode(node)
      rawTokens.push({ text, flags })
    } else if ($isLineBreakNode(node)) {
      rawTokens.push({
        text: "\n",
        flags: { bold: false, italic: false, strikethrough: false, code: false },
      })
    } else if ($isElementNode(node)) {
      const childResult = processInlineNodes(node.getChildren())
      rawTokens.push({
        text: childResult,
        flags: { bold: false, italic: false, strikethrough: false, code: false },
      })
    }
  }

  const mergedTokens: InlineToken[] = []
  for (const token of rawTokens) {
    if (token.text === "\n") {
      mergedTokens.push(token)
      continue
    }

    const last = mergedTokens[mergedTokens.length - 1]
    if (last && last.text !== "\n" && areFlagsEqual(last.flags, token.flags)) {
      last.text += token.text
    } else {
      mergedTokens.push({ ...token })
    }
  }

  return mergedTokens
    .map((token) => (token.text === "\n" ? "\n" : formatTokenText(token.text, token.flags)))
    .join("")
}

export function $convertToWhatsAppState(): string {
  const root = $getRoot()
  const children = root.getChildren()
  const blockResults: string[] = []

  for (const child of children) {
    if ($isListNode(child)) {
      const listType = child.getListType()
      const listItems = child.getChildren()
      let itemIndex = 1

      const itemStrings: string[] = []
      for (const item of listItems) {
        if ($isListItemNode(item)) {
          const prefix = listType === "number" ? (itemIndex + ". ") : "- "
          const itemText = processInlineNodes(item.getChildren())
          itemStrings.push(prefix + itemText)
          itemIndex++
        }
      }
      blockResults.push(itemStrings.join("\n"))
    } else if ($isQuoteNode(child)) {
      const quoteText = processInlineNodes(child.getChildren())
      const quoteLines = quoteText
        .split("\n")
        .map((line) => "> " + line)
        .join("\n")
      blockResults.push(quoteLines)
    } else if ($isCodeNode(child)) {
      const codeText = child.getTextContent()
      blockResults.push("```\n" + codeText + "\n```")
    } else if ($isElementNode(child)) {
      const inlineText = processInlineNodes(child.getChildren())
      blockResults.push(inlineText)
    } else {
      blockResults.push(child.getTextContent())
    }
  }

  return blockResults.join("\n")
}

export function convertEditorStateToWhatsApp(editor: LexicalEditor): string {
  let result = ""
  editor.getEditorState().read(() => {
    result = $convertToWhatsAppState()
  })
  return result
}
