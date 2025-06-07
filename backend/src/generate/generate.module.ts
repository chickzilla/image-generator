import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { GenerateService } from './generate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptHistory } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PromptHistory])],
  controllers: [GenerateController],
  providers: [GenerateService],
})
export class GenerateModule {}
