"use client"

import React from "react"
import { IconStrikethrough } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToolbar } from "../../../context/ToolbarContext"

export function StrikethroughButton() {
  const { isStrikethrough, formatStrikethrough } = useToolbar()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={isStrikethrough ? "secondary" : "ghost"}
          size="icon"
          onClick={formatStrikethrough}
          aria-label="Strikethrough (~text~)"
          className={isStrikethrough ? "bg-accent text-foreground" : ""}
        >
          <IconStrikethrough />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Strikethrough</span>
        <span className="ml-1 text-[10px] opacity-70">~text~</span>
      </TooltipContent>
    </Tooltip>
  )
}
