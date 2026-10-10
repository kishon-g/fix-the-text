"use client";

import { IconClearFormatting } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToolbar } from "@/context/ToolbarContext";

export function ClearFormattingButton() {
  const { clearFormatting } = useToolbar();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={clearFormatting}
          aria-label="Clear formatting"
          className="text-muted-foreground hover:text-foreground"
        >
          <IconClearFormatting className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Clear formatting</span>
        <span className="ml-1 text-[10px] opacity-70">(Ctrl + N)</span>
      </TooltipContent>
    </Tooltip>
  );
}
