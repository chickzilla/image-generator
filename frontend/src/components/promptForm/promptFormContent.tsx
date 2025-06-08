"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { PromptFormItem } from "./promptFormItem";
import generate from "@/services/generate";
import { useState } from "react";
import { toast } from "../ui/use-toast";

interface PromptFormContentProps {
  onGenerating: (isGenerating: boolean) => void;
  onGenerated?: (
    prompt: string,
    negativePrompt: string,
    results: string[]
  ) => void;
}
const promptSchema = z.object({
  prompt: z.string().min(1, { message: "Image Prompt is required" }).max(255, {
    message: "Image Prompt must be less than 255 characters",
  }),
  negativePrompt: z
    .string()
    .max(255, {
      message: "Negative Prompt must be less than 255 characters",
    })
    .optional(),
});

export function PromptFormContent({
  onGenerating = () => {},
  onGenerated = () => {},
}: PromptFormContentProps) {
  const [isFetching, setIsFetching] = useState(false);

  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
      negativePrompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof promptSchema>) {
    try {
      const { prompt, negativePrompt } = values;
      setIsFetching(true);
      onGenerating(true);
      toast({
        title: "Generating image",
        description: "Please wait while we generating your image.",
        isError: false,
      });
      const res = await generate({
        prompt,
        negativePrompt: negativePrompt || undefined,
      });
      onGenerated(prompt, negativePrompt || "", res.results);
      toast({
        title: "Image generated",
        description: "Your image has been generated successfully.",
        isError: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          isError: true,
        });
      }
    } finally {
      onGenerating(false);
      setIsFetching(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-6 pb-[80px]">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <PromptFormItem
                number={1}
                label="Image Prompt"
                description="Describe the image you want to generate in the prompt field."
                placeholder="e.g. futuristic city at night"
                field={field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="negativePrompt"
            render={({ field }) => (
              <PromptFormItem
                number={2}
                label="Negative Prompt"
                description="Describe what you want to exclude from the image."
                placeholder="e.g. blurry, vintage"
                field={field}
                optional
              />
            )}
          />
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t">
          <Button
            type="submit"
            disabled={!form.formState.isDirty || isFetching}
            className="w-full h-15 font-bold text-lg bg-blue-600 hover:bg-blue-700 hover:cursor-pointer disabled:opacity-70 "
          >
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
}
