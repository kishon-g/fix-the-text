"use client"

import React, { useRef, useState } from "react"

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";

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
    <main className="min-h-screen flex flex-col container mx-auto max-w-[95%] px-2 lg:px-0 py-2 gap-6">
      <Header />

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

      <Footer />
    </main>
  )
}
