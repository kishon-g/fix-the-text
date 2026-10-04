"use client"

import * as React from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import { IconBrandWhatsapp } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

export interface PlatformSelectorProps {
  platform?: string
  onPlatformChange?: (platform: string) => void
  className?: string
}

interface PlatformOption {
  label: string
  value: string
  colorClassName: string
  icon: React.ComponentType<{ className?: string }>
}

const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    label: "WhatsApp",
    value: "whatsapp",
    colorClassName: "text-emerald-500",
    icon: IconBrandWhatsapp,
  }
]

const PLATFORM_ITEMS = BaseCombobox.createItems(PLATFORM_OPTIONS, {
  getValue: (platform) => platform.value,
  getLabel: (platform) => platform.label,
})

export function PlatformSelector({
  platform = "whatsapp",
  onPlatformChange,
  className,
}: PlatformSelectorProps) {
  const selectedPlatform =
    PLATFORM_OPTIONS.find((item) => item.value === platform) ?? PLATFORM_OPTIONS[0]

  return (
    <Combobox
      items={PLATFORM_ITEMS}
      value={platform}
      onValueChange={(value) => {
        if (value) {
          onPlatformChange?.(value)
        }
      }}
    >
      <ComboboxTrigger
        className={cn(
          "flex w-44 items-center justify-between gap-2.5 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-xs",
          className
        )}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {selectedPlatform ? (
            <selectedPlatform.icon
              className={`size-4 shrink-0 ${selectedPlatform.colorClassName}`}
            />
          ) : null}
          <ComboboxValue placeholder="Select a platform" />
        </span>
      </ComboboxTrigger>
      <ComboboxContent className="w-(--anchor-width) min-w-(--anchor-width)">
        <ComboboxEmpty>No platforms found</ComboboxEmpty>
        <ComboboxList>
          {(item: PlatformOption) => (
            <ComboboxItem key={item.value} value={item.value} className="gap-2.5">
              <item.icon
                className={`size-4 shrink-0 ${item.colorClassName}`}
              />
              <span className="font-semibold text-foreground tracking-tight">
                {item.label}
              </span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
