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
import { $getRoot, $createParagraphNode } from "lexical"

import { WhatsAppToolbar } from "./application/WhatsAppToolbar"
import { useEditor } from "@/hooks/useEditor";

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
  const { initialConfig, handleEditorChange } = useEditor({ onChangeText })

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card shadow-xs transition-shadow focus-within:ring-2 focus-within:ring-ring/40">
      <LexicalComposer initialConfig={initialConfig}>
        <WhatsAppToolbar />
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
