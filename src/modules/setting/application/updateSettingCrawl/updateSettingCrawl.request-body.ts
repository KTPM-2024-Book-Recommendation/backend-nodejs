import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PeriodType } from "@prisma/client";
import {
  IsBoolean,
  IsEnum,
  IsString,
  MaxLength,
  ValidateIf,
} from "class-validator";
import { IsCrawlTimeFormat } from "src/common/decorator/crawlTime.decorator";

export class UpdateSettingCrawlRequestBody {
  @ApiProperty({
    description: "Is Auto Crawl",
    example: true,
  })
  @IsBoolean()
  isAutoCrawl: boolean;

  @ApiPropertyOptional({
    description: "periodType",
    example: PeriodType.MONTH,
  })
  @ValidateIf((o) => o.isAutoCrawl == true)
  @IsEnum(PeriodType)
  periodType?: PeriodType;

  @ApiPropertyOptional({
    description: "Value",
    type: String,
    example: "MONDAY",
  })
  @ValidateIf((o) => o.isAutoCrawl == true)
  @IsString()
  @MaxLength(255, { message: "Value cannot exceed 255 characters" })
  value?: string;

  @ApiPropertyOptional({
    description: "Value",
    type: String,
    example: "08:00",
  })
  @ValidateIf((o) => o.isAutoCrawl == true)
  @IsString()
  @IsCrawlTimeFormat("time")
  time?: string;
}
