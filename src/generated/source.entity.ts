import { ApiProperty } from "@nestjs/swagger";
import { BookEntity } from "./book.entity";

export class SourceEntity {
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
  @ApiProperty({
    isArray: true,
    required: false,
  })
  books?: BookEntity[];
}
