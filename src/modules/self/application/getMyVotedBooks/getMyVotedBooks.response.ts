import { ApiProperty } from "@nestjs/swagger";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";
import { BookDto } from "src/generated";

export class GetMyVotedBooksResponse implements Partial<BookDto> {}

export class GetMyVotedBooksQueryResponse extends PaginatedOutputDto<GetMyVotedBooksResponse> {
    @ApiProperty({
      description: "List of my voted books",
      isArray: true,
    })
    data: GetMyVotedBooksResponse[];
  }
