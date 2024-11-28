import { ApiProperty } from "@nestjs/swagger";
import { AuthorEntity } from "./author.entity";
import { BookEntity } from "./book.entity";

export class AuthorToBookEntity {
  @ApiProperty({
    required: false,
  })
  authorId: string;
  @ApiProperty({
    required: false,
  })
  bookId: string;
  @ApiProperty({
    required: false,
  })
  author?: AuthorEntity;
  @ApiProperty({
    required: false,
  })
  book?: BookEntity;
}
