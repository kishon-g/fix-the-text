"use client";

import type React from "react";

export function parseWhatsAppInline(text: string): React.ReactNode[] {
  const regex = /(\*[^*\\n]+\*|_[^_\\n]+_|~[^~\\n]+~|`[^`\\n]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <strong
          key={idx}
          className="font-semibold text-zinc-950 dark:text-zinc-50"
        >
          {parseWhatsAppInline(part.slice(1, -1))}
        </strong>
      );
    }
    if (part.startsWith("_") && part.endsWith("_") && part.length >= 2) {
      return (
        <em key={idx} className="italic text-zinc-900 dark:text-zinc-100">
          {parseWhatsAppInline(part.slice(1, -1))}
        </em>
      );
    }
    if (part.startsWith("~") && part.endsWith("~") && part.length >= 2) {
      return (
        <del
          key={idx}
          className="line-through text-zinc-600 dark:text-zinc-400"
        >
          {parseWhatsAppInline(part.slice(1, -1))}
        </del>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={idx}
          className="font-mono text-[0.85em] bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-zinc-900 dark:text-zinc-100"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

export function renderWhatsAppMessage(text: string) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1 text-[13.5px] leading-snug font-sans text-zinc-900 dark:text-zinc-100 break-words whitespace-pre-wrap">
      {lines.map((line, idx) => {
        if (line.startsWith("> ")) {
          const quoteContent = line.slice(2);
          return (
            <div
              key={idx}
              className="my-1.5 border-l-[3px] border-emerald-600/80 dark:border-emerald-400/80 bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-r-md text-xs min-h-[1.375em]"
            >
              {quoteContent.trim().length === 0 ? (
                <br />
              ) : (
                parseWhatsAppInline(quoteContent)
              )}
            </div>
          );
        }
        return (
          <div key={idx} className="min-h-[1.375em]">
            {line.trim().length === 0 ? <br /> : parseWhatsAppInline(line)}
          </div>
        );
      })}
    </div>
  );
}
