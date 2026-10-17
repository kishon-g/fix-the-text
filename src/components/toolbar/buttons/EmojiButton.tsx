"use client";

import { IconMoodSmile } from "@tabler/icons-react";
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToolbar } from "../../../context/ToolbarContext";

export function EmojiButton() {
  const { insertEmoji } = useToolbar();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        document.documentElement.classList.contains("dark")
          ? Theme.DARK
          : Theme.LIGHT,
      );
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    insertEmoji(emojiData.emoji);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant={open ? "secondary" : "ghost"}
                size="icon"
                aria-label="Emoji"
                className={open ? "bg-accent text-foreground" : ""}
              >
                <IconMoodSmile className="size-4" />
              </Button>
            }
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>Emoji</span>
        </TooltipContent>
      </Tooltip>

      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        className="w-auto p-0 border-none shadow-xl bg-transparent [&_*::-webkit-scrollbar]:hidden [&_*]:[scrollbar-width:none]"
      >
        <EmojiPicker
          theme={theme}
          onEmojiClick={handleEmojiClick}
          searchDisabled={false}
          searchPlaceHolder="Search emoji..."
          previewConfig={{
            showPreview: false,
          }}
          width={310}
          height={360}
        />
      </PopoverContent>
    </Popover>
  );
}
