"use client"

import React from "react"
import { IconBold } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToolbar } from "@/context/ToolbarContext"

export function BoldButton() {
  const { isBold, formatBold } = useToolbar()

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          type="button"
          variant={isBold ? "secondary" : "ghost"}
          size="icon"
          onClick={formatBold}
          aria-label="Bold (*text*)"
          className={isBold ? "bg-accent font-bold text-foreground" : ""}
        >
          <IconBold />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Bold</span>
        <span className="ml-1 text-[10px] opacity-70">*text* (Ctrl+B)</span>
      </TooltipContent>
    </Tooltip>
  )
}
