"use client";

import { IconChecks, IconMessagesOff } from "@tabler/icons-react";
import type { PlatformPreviewProps } from "../types";
import { renderWhatsAppMessage } from "./whatsappFormatter";

export function WhatsAppPreview({ text, timeString }: PlatformPreviewProps) {
  if (!text.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground/60">
        <IconMessagesOff className="size-8 mb-2 stroke-[1.5] text-muted-foreground/40" />
        <p className="text-sm font-medium">No content to preview</p>
        <p className="text-xs text-muted-foreground/70 mt-1 max-w-xs">
          Start typing in the editor to see your live WhatsApp formatted
          preview.
        </p>
      </div>
    );
  }

  const displayTime =
    timeString ||
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex flex-col justify-start">
      <div className="self-end max-w-[92%] sm:max-w-[85%] rounded-2xl rounded-tr-xs bg-[#e7fce3] dark:bg-[#004d40] border border-emerald-300/40 dark:border-emerald-800/40 p-3.5 shadow-xs transition-all">
        {renderWhatsAppMessage(text)}
        <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
          <span>{displayTime}</span>
          <IconChecks className="size-3.5 text-blue-500" />
        </div>
      </div>
    </div>
  );
}
