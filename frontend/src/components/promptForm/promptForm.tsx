"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { PromptFormContent } from "./promptFormContent";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PromptFormProps {
  onGenerating: (isGenerating: boolean) => void;
  onGenerated?: (
    prompt: string,
    negativePrompt: string,
    results: string[]
  ) => void;
}
export default function PromptForm({
  onGenerating = (isGenerating: boolean) => {},
  onGenerated = (
    prompt: string,
    negativePrompt: string,
    results: string[]
  ) => {},
}: PromptFormProps) {
  const isDesktop = useMediaQuery("(min-width: 840px)");
  const [open, setOpen] = useState(true);

  if (isDesktop) {
    return (
      <aside className="w-[320px] h-screen border-r bg-white px-4 py-6">
        <PromptFormContent
          onGenerating={(isGenerating: boolean) => {
            onGenerating(isGenerating);
          }}
          onGenerated={(
            prompt: string,
            negativePrompt: string,
            results: string[]
          ) => {
            onGenerated(prompt, negativePrompt, results);
          }}
        />
      </aside>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-4 z-50">
        <DrawerTrigger asChild>
          <div className="w-screen items-center text-center flex flex-col justify-center border-t border-gray rounded-2xl gap-3 pt-2">
            <ChevronUp className="text-black w-10 h-10" />
            <div className="text-blue font-bold text-xl">Generate</div>
          </div>
        </DrawerTrigger>
      </div>
      <DrawerContent className="bg-white px-8 h-screen max-h-max">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerClose asChild className="text-center w-full">
            <ChevronDown className="text-black w-10 h-10 " />
          </DrawerClose>
        </DrawerHeader>
        <PromptFormContent
          onGenerating={(isGenerating: boolean) => {
            onGenerating(isGenerating);
          }}
          onGenerated={(
            prompt: string,
            negativePrompt: string,
            results: string[]
          ) => {
            onGenerated(prompt, negativePrompt, results);
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}
