"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { PromptFormItem } from "./promptFormItem";
import generate from "@/services/generate";
import { ca } from "zod/v4/locales";

const promptSchema = z.object({
  prompt: z.string().min(1, { message: "Image Prompt is required" }),
  negativePrompt: z.string().optional(),
});

export function PromptFormContent() {
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
      const res = await generate({
        prompt,
        negativePrompt: negativePrompt || undefined,
      });
      console.log("Image generated successfully:", res);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error generating image:", error.message);
      }
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
            className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
          >
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
}
