import { PeriodType } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSettingCrawlDto {
  @ApiProperty({
    enum: PeriodType,
    required: false,
  })
  @IsOptional()
  periodType?: PeriodType;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  value?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  time?: string;
}
