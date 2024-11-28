import { InteractionInfo } from "src/common/dto/book.dto";
import { AuthorToBookDto, SourceDto } from "src/generated";

export class GetBookByIdQueryResponse {
  id: string;
  title: string;
  description: string;
  bookCover: string;
  language: string;
  imageUrl: string;
  releaseDate: Date;
  publisher: string;
  numberOfPages: number;
  price: number;
  averageRating: number;
  numberOfRatings: number;
  numberOfReviews: number;
  createdAt: Date;
  source?: SourceDto;
  authors?: AuthorToBookDto[];
  interactions: InteractionInfo[];
}
