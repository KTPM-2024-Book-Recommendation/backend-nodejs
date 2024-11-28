import { ApiProperty } from "@nestjs/swagger";

export class SourceDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  id: number;
  @ApiProperty({
    required: false,
  })
  name: string;
}
