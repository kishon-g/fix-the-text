"use client"

import React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { ToolbarProvider } from "@/context/ToolbarContext"
import {
  BoldButton,
  ItalicButton,
  StrikethroughButton,
  CodeButton,
  BulletListButton,
  NumberedListButton,
  QuoteButton,
  ClearFormattingButton,
  ClearAllButton,
} from "@/components/toolbar";

export function WhatsAppToolbar() {
  return (
    <ToolbarProvider>
      <TooltipProvider delay={200}>
        <div className="flex w-full flex-wrap items-center justify-between gap-2 rounded-t-xl border-b border-border/80 bg-muted/30 p-2 text-foreground shrink-0">
          <div className="flex flex-wrap items-center gap-1">
            <BoldButton />
            <ItalicButton />
            <StrikethroughButton />
            <CodeButton />

            <Separator orientation="vertical" className="mx-1" />

            <BulletListButton />
            <NumberedListButton />
            <QuoteButton />

            <Separator orientation="vertical" className="mx-1" />

            <ClearFormattingButton />
          </div>

          <ClearAllButton />
        </div>
      </TooltipProvider>
    </ToolbarProvider>
  )
}

