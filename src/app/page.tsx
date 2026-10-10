"use client";

import { useState } from "react";
import { Editor } from "@/components/Editor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Preview } from "@/components/Preview";

export default function Home() {
  const [platform, setPlatform] = useState<string>("whatsapp");
  const [whatsappText, setWhatsappText] = useState("");

  const handleTextChange = (formatted: string) => {
    setWhatsappText(formatted);
  };

  return (
    <main className="h-screen flex flex-col container mx-auto max-w-[95%] px-2 lg:px-0 py-2 gap-4 overflow-hidden">
      <Header platform={platform} onPlatformChange={setPlatform} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch flex-1 min-h-0 overflow-hidden pt-6">
        <div className="flex flex-col h-full min-h-0 overflow-hidden">
          <Editor onChangeText={handleTextChange} />
        </div>

        <div className="flex flex-col h-full min-h-0 overflow-hidden">
          <Preview whatsappText={whatsappText} platform={platform} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
