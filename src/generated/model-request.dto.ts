import { ModelType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ModelRequestDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    enum: ModelType,
    required: false,
  })
  modelType: ModelType;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  count: number;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
}
