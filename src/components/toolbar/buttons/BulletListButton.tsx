"use client";

import { IconList } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToolbar } from "@/context/ToolbarContext";

export function BulletListButton() {
  const { isBulletList, toggleBulletList } = useToolbar();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          type="button"
          variant={isBulletList ? "secondary" : "ghost"}
          size="icon"
          onClick={toggleBulletList}
          aria-label="Bullet list (- item)"
          className={isBulletList ? "bg-accent text-foreground" : ""}
        >
          <IconList />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Bullet List</span>
        <span className="ml-1 text-[10px] opacity-70">- item</span>
      </TooltipContent>
    </Tooltip>
  );
}
