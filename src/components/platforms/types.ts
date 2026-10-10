"use client";

import type React from "react";

export interface PlatformPreviewProps {
  text: string;
  timeString?: string;
}

export interface PlatformDefinition {
  id: string;
  name: string;
  badgeLabel?: string;
  colorClassName?: string;
  icon?: React.ComponentType<{ className?: string }>;
  Component: React.ComponentType<PlatformPreviewProps>;
  rawSyntaxPlaceholder?: string;
}
