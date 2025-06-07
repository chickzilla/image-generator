import { GenerateResponse } from "@/types";

export default async function generate({
  prompt,
  negativePrompt,
}: {
  prompt: string;
  negativePrompt?: string;
}): Promise<GenerateResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      negativePrompt: negativePrompt || "",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}
