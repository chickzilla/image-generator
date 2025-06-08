"use client";
import ImageArea from "@/components/imageArea/imageArea";
import PromptForm from "@/components/promptForm/promptForm";
import { useState } from "react";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  return (
    <main className="pt-[50px] h-screen overflow-hidden flex flex-col md:flex-row">
      <PromptForm
        onGenerating={(isGenerating: boolean) => {
          setIsGenerating(isGenerating);
        }}
      />
      <div className="flex-1 overflow-auto">
        <ImageArea isGenerating={isGenerating} />
      </div>
    </main>
  );
}
