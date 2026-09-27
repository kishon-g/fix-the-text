"use client"

import React from "react"
import { IconListNumbers } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToolbar } from "@/context/ToolbarContext"

export function NumberedListButton() {
  const { isNumberedList, toggleNumberedList } = useToolbar()

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          type="button"
          variant={isNumberedList ? "secondary" : "ghost"}
          size="icon"
          onClick={toggleNumberedList}
          aria-label="Numbered list (1. item)"
          className={isNumberedList ? "bg-accent text-foreground" : ""}
        >
          <IconListNumbers />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Numbered List</span>
        <span className="ml-1 text-[10px] opacity-70">1. item</span>
      </TooltipContent>
    </Tooltip>
  )
}
