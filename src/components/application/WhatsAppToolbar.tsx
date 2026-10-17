"use client";

import {
  BoldButton,
  BulletListButton,
  ClearAllButton,
  ClearFormattingButton,
  CodeButton,
  EmojiButton,
  ItalicButton,
  NumberedListButton,
  QuoteButton,
  StrikethroughButton,
} from "@/components/toolbar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToolbarProvider } from "@/context/ToolbarContext";

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

            <EmojiButton />

            <Separator orientation="vertical" className="mx-1" />

            <ClearFormattingButton />
          </div>

          <ClearAllButton />
        </div>
      </TooltipProvider>
    </ToolbarProvider>
  );
}
