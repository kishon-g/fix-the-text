"use client"

import React from "react"
import { IconTrash } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToolbar } from "@/context/ToolbarContext"

export function ClearAllButton() {
  const { clearAll } = useToolbar()

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={clearAll}
          aria-label="Clear text"
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <IconTrash className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Clear text</span>
        <span className="ml-1 text-[10px] opacity-70">(Ctrl + Delete)</span>
      </TooltipContent>
    </Tooltip>
  )
}
