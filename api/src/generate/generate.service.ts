import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromptHistory } from 'src/entities';
import { Repository } from 'typeorm';
import {
  GenerateRequestDTO,
  GenerateResponseDTO,
  SpacelyAIGenerateResponseDTO,
  SpacelyAIPoolingResponseDTO,
} from './dto/generate.dto';
import axios from 'axios';
import {
  imageStatus,
  POLLING_DELAY_MS,
  POLLING_MAX_ATTEMPTS,
} from 'src/constant';

@Injectable()
export class GenerateService {
  constructor(
    @InjectRepository(PromptHistory)
    private readonly promptHistoryRepository: Repository<PromptHistory>,
  ) {}

  async generate(
    generateRequestDTO: GenerateRequestDTO,
  ): Promise<GenerateResponseDTO> {
    const { prompt, negativePrompt } = generateRequestDTO;

    const genResponse = await axios.post<SpacelyAIGenerateResponseDTO>(
      `${process.env.SPACELY_API_URL}/generate/text-to-image`,
      {
        prompt,
        nPrompt: negativePrompt || '',
      },
      {
        headers: {
          'X-API-KEY': process.env.AI_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    const refId = genResponse.data?.data;
    if (!refId) {
      throw new InternalServerErrorException(
        'Failed to get REF_ID from spacely AI API',
      );
    }

    const results = await this.pollForResult(refId);

    await this.promptHistoryRepository.create({
      prompt,
      negativePrompt: negativePrompt || '',
      RefId: refId,
      results,
    });

    return {
      results,
    };
  }

  private async pollForResult(refId: string): Promise<string[]> {
    for (let attempt = 0; attempt < POLLING_MAX_ATTEMPTS; attempt++) {
      const result = await axios.get(
        `${process.env.SPACELY_API_URL}/generate/poll-result?refId=${refId}`,
        {
          headers: {
            'X-API-KEY': process.env.AI_API_KEY,
          },
        },
      );

      const resultData = result.data as SpacelyAIPoolingResponseDTO;
      console.log('Polling result:', resultData);
      const status = resultData.data?.status;

      if (status === imageStatus.SUCCESS) {
        return resultData.data?.result || [];
      }
      await new Promise((res) => setTimeout(res, POLLING_DELAY_MS));
    }

    throw new InternalServerErrorException('Polling timed out');
  }
}
