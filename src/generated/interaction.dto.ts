import { InteractionType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class InteractionDto {
  @ApiProperty({
    enum: InteractionType,
    required: false,
  })
  type: InteractionType;
  @ApiProperty({
    type: "number",
    format: "float",
    required: false,
  })
  value: number;
  @ApiProperty({
    required: false,
  })
  trained: boolean;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
}
