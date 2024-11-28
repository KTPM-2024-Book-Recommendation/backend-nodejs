import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInteractionDto {
  @ApiProperty({
    type: "number",
    format: "float",
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
