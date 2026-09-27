"use client"

import React, { useRef, useState } from "react"
import { Copy, Check, Trash2 } from "lucide-react"

import { Header } from "@/components/Header"
import { Editor } from "@/components/Editor"
import { Preview } from "@/components/Preview"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [whatsappText, setWhatsappText] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [copied, setCopied] = useState(false)

  const clearEditorRef = useRef<(() => void) | null>(null)

  const handleTextChange = (formatted: string, chars: number, words: number) => {
    setWhatsappText(formatted)
    setCharCount(chars)
    setWordCount(words)
  }

  const handleRegisterClear = (clearFn: () => void) => {
    clearEditorRef.current = clearFn
  }

  const handleCopy = async () => {
    if (!whatsappText.trim()) return

    try {
      await navigator.clipboard.writeText(whatsappText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleClear = () => {
    if (clearEditorRef.current) {
      clearEditorRef.current()
    }
    setWhatsappText("")
    setCharCount(0)
    setWordCount(0)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
      <Header />

      <main className="flex-1 container mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 flex flex-col gap-6">
        {/* Subheader & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border/70 bg-card p-4 shadow-xs">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              WhatsApp Message Composer
              <Badge variant="secondary" className="text-[11px]">
                No Signup
              </Badge>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Format your text using bold, italic, lists, and quotes. Copy WhatsApp-ready text instantly.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-border/60">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-muted/40 px-3 py-1.5 rounded-lg border border-border/50">
              <span>
                <strong className="text-foreground font-semibold">{charCount}</strong> chars
              </span>
              <span className="text-border">|</span>
              <span>
                <strong className="text-foreground font-semibold">{wordCount}</strong> words
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={!whatsappText.trim()}
                className="gap-1.5"
              >
                <Trash2 className="size-3.5" />
                <span>Clear</span>
              </Button>

              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleCopy}
                disabled={!whatsappText.trim()}
                className="gap-1.5 min-w-[140px] shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-400 animate-in zoom-in-50" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy for WhatsApp</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout: Editor on left, Preview on right for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch flex-1">
          <div className="flex flex-col h-full min-h-[380px] sm:min-h-[440px]">
            <Editor
              onChangeText={handleTextChange}
              onRegisterClear={handleRegisterClear}
            />
          </div>

          <div className="flex flex-col h-full min-h-[380px] sm:min-h-[440px]">
            <Preview whatsappText={whatsappText} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/20 py-4 text-center text-xs text-muted-foreground">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Fix the Text. Free, private WhatsApp message formatter.</p>
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <span>Runs 100% locally in your browser</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
