"use client"

import React, { useState } from "react"
import { CheckCheck, Eye, FileCode2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface PreviewProps {
  whatsappText: string
}

function parseWhatsAppInline(text: string): React.ReactNode[] {
  const regex = /(\*[^\*\n]+\*|_[^\_\n]+_|~[^~\n]+~|`[^`\n]+`)/g
  const parts = text.split(regex)

  return parts.map((part, idx) => {
    if (!part) return null

    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <strong key={idx} className="font-semibold text-zinc-950 dark:text-zinc-50">
          {parseWhatsAppInline(part.slice(1, -1))}
        </strong>
      )
    }
    if (part.startsWith("_") && part.endsWith("_") && part.length >= 2) {
      return (
        <em key={idx} className="italic text-zinc-900 dark:text-zinc-100">
          {parseWhatsAppInline(part.slice(1, -1))}
        </em>
      )
    }
    if (part.startsWith("~") && part.endsWith("~") && part.length >= 2) {
      return (
        <del key={idx} className="line-through text-zinc-600 dark:text-zinc-400">
          {parseWhatsAppInline(part.slice(1, -1))}
        </del>
      )
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={idx}
          className="font-mono text-[0.85em] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-zinc-900 dark:text-zinc-100"
        >
          {part.slice(1, -1)}
        </code>
      )
    }

    return part
  })
}

function renderFormattedMessage(whatsappText: string) {
  if (!whatsappText.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground/60">
        <Eye className="size-8 mb-2 stroke-[1.5] text-muted-foreground/40" />
        <p className="text-sm font-medium">No content to preview</p>
        <p className="text-xs text-muted-foreground/70 mt-1 max-w-xs">
          Start typing in the editor to see your live WhatsApp formatted preview.
        </p>
      </div>
    )
  }

  const lines = whatsappText.split("\n")

  return (
    <div className="space-y-1 text-[13.5px] leading-snug font-sans text-zinc-900 dark:text-zinc-100 break-words whitespace-pre-wrap">
      {lines.map((line, idx) => {
        if (line.startsWith("> ")) {
          return (
            <div
              key={idx}
              className="my-1.5 border-l-[3px] border-emerald-600/80 dark:border-emerald-400/80 bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-r-md text-xs"
            >
              {parseWhatsAppInline(line.slice(2))}
            </div>
          )
        }
        return (
          <div key={idx} className="min-h-[1.2rem]">
            {parseWhatsAppInline(line)}
          </div>
        )
      })}
    </div>
  )
}

export function Preview({ whatsappText }: PreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")

  const timeString = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className="flex flex-col h-full border border-border shadow-xs overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4 border-b border-border/60 bg-muted/20">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-semibold tracking-tight">
            WhatsApp Live Preview
          </CardTitle>
          <Badge variant="secondary" className="text-[10px] font-normal px-2 py-0">
            Live
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList variant="default" className="h-8 p-0.5 bg-muted/60">
            <TabsTrigger value="preview" className="text-xs px-2.5 h-7">
              <Eye className="size-3.5 mr-1" />
              Bubble
            </TabsTrigger>
            <TabsTrigger value="raw" className="text-xs px-2.5 h-7">
              <FileCode2 className="size-3.5 mr-1" />
              Raw Syntax
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="flex-1 p-4 bg-zinc-100/60 dark:bg-zinc-950/40 flex flex-col justify-between min-h-[300px] sm:min-h-[360px]">
        {activeTab === "preview" ? (
          <div className="flex flex-col justify-start h-full">
            {whatsappText.trim() ? (
              <div className="self-end max-w-[92%] sm:max-w-[85%] rounded-2xl rounded-tr-xs bg-[#e7fce3] dark:bg-[#004d40] border border-emerald-300/40 dark:border-emerald-800/40 p-3.5 shadow-xs transition-all">
                {renderFormattedMessage(whatsappText)}
                <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                  <span>{timeString}</span>
                  <CheckCheck className="size-3.5 text-blue-500" />
                </div>
              </div>
            ) : (
              renderFormattedMessage(whatsappText)
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {whatsappText.trim() ? (
              <div className="relative flex-1 rounded-lg border border-border/80 bg-background p-3.5 font-mono text-xs text-foreground overflow-auto whitespace-pre-wrap break-words leading-relaxed select-all">
                {whatsappText}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground/60">
                <FileCode2 className="size-8 mb-2 stroke-[1.5] text-muted-foreground/40" />
                <p className="text-sm font-medium">No raw syntax generated</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Type in the editor to view the WhatsApp formatted markdown text.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
