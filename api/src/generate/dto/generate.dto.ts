import { imageStatus } from 'src/constant';

export interface GenerateRequestDTO {
  prompt: string;
  negativePrompt?: string;
}

export interface GenerateResponseDTO {
  results: string[];
}

export interface SpacelyAIGenerateResponseDTO {
  data: string;
}

export interface SpacelyAIPoolingResponseDTO {
  data: {
    status: imageStatus;
    result: string[];
    webhookUrl: string;
  };
}
