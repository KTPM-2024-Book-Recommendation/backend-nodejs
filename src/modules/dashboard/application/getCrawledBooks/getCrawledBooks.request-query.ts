import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class GetCrawledBooksRequestQuery {
  @ApiPropertyOptional({
    description: 'source id',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sourceId?: number;
}
