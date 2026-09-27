import React from "react"
import { Badge } from "@/components/ui/badge"
import { MessageSquareText, ShieldCheck, Zap } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/40 shadow-xs">
            <MessageSquareText className="size-5 text-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                Fix the Text
              </h1>
              <Badge variant="outline" className="hidden text-[11px] font-medium sm:inline-flex">
                WhatsApp Composer
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Write, format, and copy messages for WhatsApp.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-border px-3 py-1 bg-muted/20">
            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>100% Local & Private</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 bg-muted/20">
            <Zap className="size-3.5 text-amber-500" />
            <span>Instant Preview</span>
          </div>
        </div>
      </div>
    </header>
  )
}
