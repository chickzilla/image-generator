"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { PromptFormItem } from "./promptFormItem";

const promptSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  negativePrompt: z.string().optional(),
});

export function PromptForm() {
  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
      negativePrompt: "",
    },
  });

  function onSubmit(values: z.infer<typeof promptSchema>) {
    // TODO: Integrate
  }

  return (
    <aside className="w-[320px] h-screen border-r bg-white px-4 py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
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

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Generate
          </Button>
        </form>
      </Form>
    </aside>
  );
}
