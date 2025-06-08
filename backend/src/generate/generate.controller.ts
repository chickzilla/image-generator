import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { GenerateService } from './generate.service';
import {
  GenerateRequestDTO,
  GenerateResponseDTO,
  PromptHistoriesResponseDto,
} from './dto';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto';

@Controller('')
@ApiBadRequestResponse({
  description: 'Bad Request',
  type: ErrorResponseDto,
})
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Post('/generate')
  @ApiCreatedResponse({
    description: 'Generates images based on prompts',
    type: GenerateResponseDTO,
  })
  async generate(@Body() payload: GenerateRequestDTO) {
    try {
      return await this.generateService.generate(payload);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/history')
  @ApiCreatedResponse({
    description: 'Retrieves the history of generated prompts',
    type: [PromptHistoriesResponseDto],
  })
  async getHistory() {
    try {
      return await this.generateService.history();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
