"use client";

import type { PlatformDefinition } from "./types";
import { WhatsAppPreview } from "./whatsapp";

export const PLATFORM_REGISTRY: Record<string, PlatformDefinition> = {
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp",
    badgeLabel: "WhatsApp View",
    Component: WhatsAppPreview,
    rawSyntaxPlaceholder:
      "Type in the editor to view the WhatsApp formatted markdown text.",
  },
  // Future platforms can be plugged in here:
  // telegram: { id: "telegram", name: "Telegram", Component: TelegramPreview },
  // slack: { id: "slack", name: "Slack", Component: SlackPreview },
  // discord: { id: "discord", name: "Discord", Component: DiscordPreview },
};

export function getPlatformDefinition(
  platformId: string = "whatsapp",
): PlatformDefinition {
  return PLATFORM_REGISTRY[platformId] || PLATFORM_REGISTRY.whatsapp;
}
