import { ApiProperty } from "@nestjs/swagger";
import { AuthorToBookEntity } from "./author-to-book.entity";

export class AuthorEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  name: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  avatar: string | null;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  authors?: AuthorToBookEntity[];
}
