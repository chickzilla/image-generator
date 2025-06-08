import { ApiProperty } from '@nestjs/swagger';
import { PromptHistory } from 'src/entities';
import { promptHistoriesExample } from 'src/example';

export class PromptHistoriesResponseDto {
  @ApiProperty({
    type: [PromptHistory],
    description: 'List of prompt history items',
    example: [promptHistoriesExample],
  })
  items: PromptHistory[];
}
