export type promptHistory = {
  id: string;
  prompt: string;
  negativePrompt?: string;
  RefId: string;
  results: string[];
  createdAt: Date;
};

export type PromptHistoryResponse = {
  items: promptHistory[];
};
