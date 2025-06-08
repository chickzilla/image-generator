import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { GenerateResponseExample } from 'src/example';

export class GenerateRequestDTO {
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  prompt: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  negativePrompt?: string;
}

export class GenerateResponseDTO {
  @ApiProperty({
    example: GenerateResponseExample,
    description: 'Array of generated image URLs',
  })
  results: string[];
}
