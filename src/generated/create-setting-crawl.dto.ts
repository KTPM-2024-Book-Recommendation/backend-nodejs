import { PeriodType } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSettingCrawlDto {
  @ApiProperty({
    enum: PeriodType,
  })
  @IsNotEmpty()
  periodType: PeriodType;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  time: string;
}
