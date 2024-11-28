import { ModelType } from "@prisma/client";
import { IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateModelRequestDto {
  @ApiProperty({
    enum: ModelType,
    required: false,
  })
  @IsOptional()
  modelType?: ModelType;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  @IsOptional()
  @IsInt()
  count?: number;
}
