import { imageStatus } from 'src/constant';

export class SpacelyAIGenerateResponseDTO {
  data: string;
}

export class SpacelyAIPoolingResponseDTO {
  data: {
    status: imageStatus;
    result: string[];
    webhookUrl: string;
  };
}
