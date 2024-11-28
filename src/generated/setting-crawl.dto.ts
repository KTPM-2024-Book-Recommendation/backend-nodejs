import { PeriodType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class SettingCrawlDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    enum: PeriodType,
    required: false,
  })
  periodType: PeriodType;
  @ApiProperty({
    required: false,
  })
  value: string;
  @ApiProperty({
    required: false,
  })
  time: string;
}
