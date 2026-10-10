"use client"

import type React from "react"

export interface PlatformPreviewProps {
  text: string
  timeString?: string
}

export interface PlatformDefinition {
  id: string
  name: string
  badgeLabel?: string
  Component: React.ComponentType<PlatformPreviewProps>
  rawSyntaxPlaceholder?: string
}
