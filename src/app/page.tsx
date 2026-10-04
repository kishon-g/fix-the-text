"use client"

import React, { useRef, useState } from "react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Editor } from "@/components/Editor"
import { Preview } from "@/components/Preview"
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox"

const PLATFORMS = ["WhatsApp"]

export default function Home() {
  const [platform, setPlatform] = useState<string | null>("WhatsApp")
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
    <main className="h-screen flex flex-col container mx-auto max-w-[95%] px-2 lg:px-0 py-2 gap-4 overflow-hidden">
      <Header />

      <div className="flex items-center justify-between gap-3 px-1 shrink-0">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Format for:
          </label>
          <Combobox
            items={PLATFORMS}
            value={platform}
            defaultValue="WhatsApp"
            onValueChange={(val) => {
              if (val) setPlatform(val)
            }}
          >
            <ComboboxInput
              placeholder="Select application..."
              className="w-44 h-8 text-xs"
              showClear={false}
            />
            <ComboboxContent>
              <ComboboxList>
                {PLATFORMS.map((p) => (
                  <ComboboxItem key={p} value={p}>
                    {p}
                  </ComboboxItem>
                ))}
              </ComboboxList>
              <ComboboxEmpty>No application found</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col h-full min-h-0 overflow-hidden">
          <Editor
            onChangeText={handleTextChange}
            onRegisterClear={handleRegisterClear}
          />
        </div>

        <div className="flex flex-col h-full min-h-0 overflow-hidden">
          <Preview
            whatsappText={whatsappText}
            platform={platform?.toLowerCase() ?? "whatsapp"}
          />
        </div>
      </div>

      <Footer />
    </main>
  )
}
