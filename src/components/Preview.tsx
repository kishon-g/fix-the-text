"use client"

import React, { useState } from "react"
import { IconCode, IconCodeOff, IconMessages } from "@tabler/icons-react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPlatformDefinition } from "@/components/platforms"

interface PreviewProps {
  whatsappText?: string
  text?: string
  platform?: string
}

export function Preview({ whatsappText, text, platform = "whatsapp" }: PreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")

  const contentText = text ?? whatsappText ?? ""
  const activePlatform = getPlatformDefinition(platform)
  const PlatformComponent = activePlatform.Component

  const timeString = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className="flex flex-col h-full min-h-0 p-0 gap-0 border">
      <div className="flex items-center justify-end rounded-t-xl border-b border-border/80 bg-muted/30 p-2 text-foreground shrink-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList variant="default" className="p-0.5 bg-muted/60">
            <TabsTrigger value="preview" className="text-xs px-2.5">
              <IconMessages className="size-3.5 mr-1" />
              Chat View
            </TabsTrigger>
            <TabsTrigger value="raw" className="text-xs px-2.5">
              <IconCode className="size-3.5 mr-1" />
              Raw Syntax
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <CardContent className="relative flex-1 min-h-0 p-4 overflow-y-auto scrollbar-thumb-accent">
        {activeTab === "preview" ? (
          <PlatformComponent text={contentText} timeString={timeString} />
        ) : (
          <div className="h-full flex flex-col min-h-0">
            {contentText.trim() ? (
              <div className="relative flex-1 min-h-0 rounded-lg border border-border/80 bg-background p-3.5 font-mono text-xs text-foreground overflow-y-auto [scrollbar-width:thin] whitespace-pre-wrap break-words leading-relaxed select-all">
                {contentText}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground/60">
                <IconCodeOff className="size-8 mb-2 stroke-[1.5] text-muted-foreground/40" />
                <p className="text-sm font-medium">No raw syntax generated</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {activePlatform.rawSyntaxPlaceholder ?? "Type in the editor to view the formatted raw text."}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
