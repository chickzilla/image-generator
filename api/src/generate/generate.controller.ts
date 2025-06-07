import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { GenerateService } from './generate.service';
import { GenerateRequestDTO } from './dto';

@Controller('')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Post('/generate')
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
