"use client"

import React, { useEffect } from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListNode, ListItemNode } from "@lexical/list"
import { CodeNode } from "@lexical/code-core"
import { $getRoot, $createParagraphNode, LexicalEditor } from "lexical"

import { EditorToolbar } from "./EditorToolbar"
import { convertEditorStateToWhatsApp } from "@/lib/whatsappConverter"

const editorTheme = {
  paragraph: "mb-2 last:mb-0 leading-relaxed text-foreground",
  quote: "border-l-2 border-primary/70 pl-3.5 py-0.5 italic text-muted-foreground my-2 bg-muted/20 rounded-r-md",
  list: {
    ul: "list-disc ml-5 mb-2 space-y-1 text-foreground",
    ol: "list-decimal ml-5 mb-2 space-y-1 text-foreground",
    listitem: "pl-1",
  },
  text: {
    bold: "font-bold text-foreground",
    italic: "italic",
    strikethrough: "line-through text-muted-foreground/80",
    code: "font-mono text-[0.875em] bg-muted/80 text-foreground px-1.5 py-0.5 rounded border border-border/60",
  },
}

function onError(error: Error) {
  console.error("Lexical Editor Error:", error)
}

interface RegisterClearPluginProps {
  onRegisterClear?: (clearFn: () => void) => void
}

function RegisterClearPlugin({ onRegisterClear }: RegisterClearPluginProps) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (onRegisterClear) {
      onRegisterClear(() => {
        editor.update(() => {
          const root = $getRoot()
          root.clear()
          const p = $createParagraphNode()
          root.append(p)
          p.select()
        })
      })
    }
  }, [editor, onRegisterClear])

  return null
}

interface EditorProps {
  onChangeText: (whatsappText: string, charCount: number, wordCount: number) => void
  onRegisterClear?: (clearFn: () => void) => void
}

export function Editor({ onChangeText, onRegisterClear }: EditorProps) {
  const initialConfig = {
    namespace: "FixTheTextComposer",
    theme: editorTheme,
    onError,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode],
  }

  const handleEditorChange = (_editorState: unknown, editor: LexicalEditor) => {
    const formatted = convertEditorStateToWhatsApp(editor)
    let plainText = ""
    editor.getEditorState().read(() => {
      plainText = $getRoot().getTextContent()
    })

    const charCount = plainText.length
    const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0

    onChangeText(formatted, charCount, words)
  }

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card shadow-xs transition-shadow focus-within:ring-2 focus-within:ring-ring/40">
      <LexicalComposer initialConfig={initialConfig}>
        <EditorToolbar />
        <div className="relative flex-1 p-4 min-h-[280px] sm:min-h-[340px]">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="outline-none h-full min-h-[260px] sm:min-h-[320px] text-sm leading-relaxed text-foreground"
                aria-label="WhatsApp Message Editor"
              />
            }
            placeholder={
              <div className="pointer-events-none absolute top-4 left-4 select-none text-sm text-muted-foreground/60">
                Write or paste your message here...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <OnChangePlugin onChange={handleEditorChange} />
          <RegisterClearPlugin onRegisterClear={onRegisterClear} />
        </div>
      </LexicalComposer>
    </div>
  )
}
