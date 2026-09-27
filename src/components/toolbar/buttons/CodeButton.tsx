"use client"

import React from "react"
import { IconCode } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToolbar } from "../../../context/ToolbarContext"

export function CodeButton() {
  const { isCode, formatCode } = useToolbar()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={isCode ? "secondary" : "ghost"}
          size="icon"
          onClick={formatCode}
          aria-label="Monospace (`text`)"
          className={isCode ? "bg-accent text-foreground font-mono" : ""}
        >
          <IconCode className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Monospace</span>
        <span className="ml-1 text-[10px] opacity-70">`text`</span>
      </TooltipContent>
    </Tooltip>
  )
}
