"use client";

import { IconQuote } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToolbar } from "@/context/ToolbarContext";

export function QuoteButton() {
  const { isQuote, toggleQuote } = useToolbar();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          type="button"
          variant={isQuote ? "secondary" : "ghost"}
          size="icon"
          onClick={toggleQuote}
          aria-label="Quote (> text)"
          className={isQuote ? "bg-accent text-foreground" : ""}
        >
          <IconQuote />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Quote</span>
        <span className="ml-1 text-[10px] opacity-70">&gt; text</span>
      </TooltipContent>
    </Tooltip>
  );
}
