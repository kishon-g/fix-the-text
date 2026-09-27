"use client"

import React from "react"
import { IconItalic } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToolbar } from "../../../context/ToolbarContext"

export function ItalicButton() {
  const { isItalic, formatItalic } = useToolbar()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={isItalic ? "secondary" : "ghost"}
          size="icon"
          onClick={formatItalic}
          aria-label="Italic (_text_)"
          className={isItalic ? "bg-accent text-foreground" : ""}
        >
          <IconItalic />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Italic</span>
        <span className="ml-1 text-[10px] opacity-70">_text_ (Ctrl+I)</span>
      </TooltipContent>
    </Tooltip>
  )
}
