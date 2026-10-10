"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $createParagraphNode, $getRoot } from "lexical";
import { useEffect } from "react";
import { useEditor } from "@/hooks/useEditor";
import { WhatsAppToolbar } from "./application/WhatsAppToolbar";
import { Card, CardContent, CardHeader } from "./ui/card";

interface RegisterClearPluginProps {
  onRegisterClear?: (clearFn: () => void) => void;
}

function RegisterClearPlugin({ onRegisterClear }: RegisterClearPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (onRegisterClear) {
      onRegisterClear(() => {
        editor.update(() => {
          const root = $getRoot();
          root.clear();
          const p = $createParagraphNode();
          root.append(p);
          p.select();
        });
      });
    }
  }, [editor, onRegisterClear]);

  return null;
}

interface EditorProps {
  onChangeText: (
    whatsappText: string,
    charCount: number,
    wordCount: number,
  ) => void;
  onRegisterClear?: (clearFn: () => void) => void;
}

export function Editor({ onChangeText, onRegisterClear }: EditorProps) {
  const { initialConfig, handleEditorChange } = useEditor({ onChangeText });

  return (
    <Card className="flex flex-col h-full min-h-0 p-0 gap-0 border">
      <LexicalComposer initialConfig={initialConfig}>
        <CardHeader className="p-0">
          <WhatsAppToolbar />
        </CardHeader>

        <CardContent className="relative flex-1 min-h-0 p-4 overflow-y-auto scrollbar-thumb-accent">
          <div className="min-h-full">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="outline-none min-h-full text-sm leading-relaxed text-foreground wrap-break-word"
                  aria-label="WhatsApp Message Editor"
                />
              }
              placeholder={
                <div className="pointer-events-none absolute top-4 left-4 select-none text-sm text-muted-foreground/60">
                  Write or paste your message here...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <HistoryPlugin />
          <ListPlugin />
          <OnChangePlugin onChange={handleEditorChange} />
          <RegisterClearPlugin onRegisterClear={onRegisterClear} />
        </CardContent>
      </LexicalComposer>
    </Card>
  );
}
