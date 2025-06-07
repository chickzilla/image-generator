import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GenerateRequestDTO {
  @IsString()
  @MaxLength(255)
  prompt: string;

  @IsOptional()
  @IsString()
  negativePrompt?: string;
}

export class GenerateResponseDTO {
  results: string[];
}
