import { ModelType } from "@prisma/client";
import { IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateModelRequestDto {
  @ApiProperty({
    enum: ModelType,
  })
  @IsNotEmpty()
  modelType: ModelType;
  @ApiProperty({
    type: "integer",
    format: "int32",
  })
  @IsNotEmpty()
  @IsInt()
  count: number;
}
