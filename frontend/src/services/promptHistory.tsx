import { PromptHistoryResponse } from "@/types";

export default async function promptHistory(): Promise<PromptHistoryResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}
