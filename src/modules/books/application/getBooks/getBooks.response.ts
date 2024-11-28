import { ApiProperty } from "@nestjs/swagger";
import { InteractionType } from "@prisma/client";
import { InteractionInfo } from "src/common/dto/book.dto";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";
import { AuthorToBookDto, SourceDto } from "src/generated";

export class GetBooksResponse {
  id: string;
  title: string;
  bookCover: string;
  language: string;
  imageUrl: string;
  releaseDate: Date;
  price: number;
  averageRating: number;
  interactions: InteractionInfo[];
  source?: SourceDto;
  authors?: AuthorToBookDto[];
}

export class GetBooksQueryResponse extends PaginatedOutputDto<GetBooksResponse> {
  @ApiProperty({
    description: "List of books",
    isArray: true,
  })
  data: GetBooksResponse[];
}
