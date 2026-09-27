import type { EditorThemeClasses } from "lexical"

export const editorTheme: EditorThemeClasses = {
  paragraph: "mb-2 last:mb-0 leading-relaxed text-foreground",
  quote:
    "border-l-2 border-primary/70 pl-3.5 py-0.5 italic text-muted-foreground my-2 bg-muted/20 rounded-r-md",
  list: {
    ul: "list-disc ml-5 mb-2 space-y-1 text-foreground",
    ol: "list-decimal ml-5 mb-2 space-y-1 text-foreground",
    listitem: "pl-1",
  },
  text: {
    bold: "font-bold text-foreground",
    italic: "italic",
    strikethrough: "line-through text-muted-foreground/80",
    code: "font-mono text-[0.875em] bg-muted/80 text-foreground px-1.5 py-0.5 rounded border border-border/60",
  },
}
