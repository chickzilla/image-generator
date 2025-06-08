"use client";
import ImageArea from "@/components/imageArea/imageArea";
import PromptForm from "@/components/promptForm/promptForm";
import { promptHistory } from "@/types";
import { useState } from "react";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [newGenerated, setNewGenerated] = useState<promptHistory | null>(null);
  return (
    <main className="pt-[50px] h-screen overflow-hidden flex flex-col md:flex-row">
      <PromptForm
        onGenerating={(isGenerating: boolean) => {
          setIsGenerating(isGenerating);
        }}
        onGenerated={(
          prompt: string,
          negativePrompt: string,
          results: string[]
        ) => {
          setNewGenerated({
            id: "",
            RefId: "",
            prompt,
            negativePrompt,
            results,
            createdAt: new Date(),
          });
        }}
      />
      <div className="flex-1 overflow-auto">
        <ImageArea isGenerating={isGenerating} newGenerated={newGenerated} />
      </div>
    </main>
  );
}
