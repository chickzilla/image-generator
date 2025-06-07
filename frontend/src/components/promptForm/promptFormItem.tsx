import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps } from "react-hook-form";

interface PromptFieldItemProps {
  number: number;
  label: string;
  description: string;
  placeholder: string;
  field: ControllerRenderProps<any, any>;
  optional?: boolean;
}

export function PromptFormItem({
  number,
  label,
  description,
  placeholder,
  field,
  optional = false,
}: PromptFieldItemProps) {
  return (
    <FormItem className="border border-gray p-8 rounded-xl">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-blue text-white text-sm flex items-center justify-center font-bold">
          {number}
        </div>
        <FormLabel className="text-black font-bold">
          {label}
          {optional && (
            <span className="text-blue text-sm ml-1">(optional)</span>
          )}
        </FormLabel>
      </div>
      <FormDescription className="text-gray">{description}</FormDescription>
      <FormControl>
        <Textarea
          placeholder={placeholder}
          className="min-h-[100px] border border-gray"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
