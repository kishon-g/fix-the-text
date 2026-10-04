"use client"

import * as React from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  IconBrandWhatsapp,
  IconBrandTelegram,
  IconBrandSlack,
  IconBrandDiscord,
  IconChevronDown,
  IconCheck,
  IconSparkles,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export interface PlatformSelectorProps {
  platform?: string
  onPlatformChange?: (platform: string) => void
}

interface PlatformOption {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  available: boolean
  badge: string
}

const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Standard chat formatting (*bold*, _italic_, ~strike~, ```code```)",
    icon: IconBrandWhatsapp,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    available: true,
    badge: "Active",
  }
]

const PLATFORM_IDS = PLATFORM_OPTIONS.map((p) => p.id)

export function PlatformSelector({
  platform = "whatsapp",
  onPlatformChange,
}: PlatformSelectorProps) {
  const currentId = platform.toLowerCase()
  const currentPlatform =
    PLATFORM_OPTIONS.find((p) => p.id === currentId) || PLATFORM_OPTIONS[0]
  const CurrentIcon = currentPlatform.icon

  return (
    <Combobox
      items={PLATFORM_IDS}
      value={currentId}
      onValueChange={(val) => {
        if (val && typeof val === "string") {
          onPlatformChange?.(val)
        }
      }}
    >
      <ComboboxPrimitive.Trigger
        className="group relative flex items-center gap-2 rounded-full border border-border/80 bg-background/95 dark:bg-zinc-900/95 px-3.5 py-1.5 text-xs font-medium shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all duration-200 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50 select-none cursor-pointer"
        aria-label="Select target formatting platform"
      >
        <CurrentIcon className={cn("size-4 shrink-0", currentPlatform.color)} />
        <span className="font-semibold text-foreground tracking-tight">
          {currentPlatform.name}
        </span>
        <IconChevronDown className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-open:rotate-180" />
      </ComboboxPrimitive.Trigger>

      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner
          side="bottom"
          sideOffset={8}
          align="center"
          className="isolate z-50"
        >
          <ComboboxPrimitive.Popup
            className="w-[340px] sm:w-[380px] max-w-[92vw] overflow-hidden rounded-xl border border-border/70 bg-popover/95 backdrop-blur-xl p-1 text-popover-foreground shadow-xl ring-1 ring-black/5 dark:ring-white/10 duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <IconSparkles className="size-3.5 text-emerald-500" />
                Target Platforms
              </span>
              <span className="text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded font-medium">
                1 Ready · 3 Coming Soon
              </span>
            </div>

            <ComboboxPrimitive.List className="p-1 space-y-1 focus:outline-none">
              {PLATFORM_OPTIONS.map((item) => {
                const ItemIcon = item.icon
                const isSelected = item.id === currentId
                return (
                  <ComboboxPrimitive.Item
                    key={item.id}
                    value={item.id}
                    disabled={!item.available}
                    className={cn(
                      "relative flex items-start gap-3 rounded-lg p-2.5 text-xs outline-none select-none transition-colors",
                      item.available
                        ? "cursor-pointer data-highlighted:bg-accent hover:bg-accent/60"
                        : "opacity-55 cursor-not-allowed",
                      isSelected && "bg-accent/40"
                    )}
                  >
                    <div
                      className={cn(
                        "size-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                        item.bg
                      )}
                    >
                      <ItemIcon className={cn("size-4", item.color)} />
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-xs">
                          {item.name}
                        </span>
                        <span
                          className={cn(
                            "text-[9px] font-semibold px-1.5 py-0.2 rounded-full uppercase tracking-wider",
                            item.available
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute right-2.5 top-3 flex size-4 items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <IconCheck className="size-3.5" />
                      </div>
                    )}
                  </ComboboxPrimitive.Item>
                )
              })}
            </ComboboxPrimitive.List>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  )
}
