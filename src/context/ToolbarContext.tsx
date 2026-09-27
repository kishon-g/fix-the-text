"use client"

import React, { createContext, useContext, ReactNode } from "react"
import { useEditorToolbar, EditorToolbarState } from "@/hooks/useEditorToolbar"

export type ToolbarContextType = EditorToolbarState

const ToolbarContext = createContext<ToolbarContextType | null>(null)

export function ToolbarProvider({ children }: { children: ReactNode }) {
    const toolbar = useEditorToolbar()

    return <ToolbarContext.Provider value={toolbar}>{children}</ToolbarContext.Provider>
}

export function useToolbar() {
    const context = useContext(ToolbarContext)
    if (!context) {
        throw new Error("useToolbar must be used within a ToolbarProvider")
    }
    return context
}
