import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateInteractionDto {
  @ApiProperty({
    type: "number",
    format: "float",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  value?: number;
}
