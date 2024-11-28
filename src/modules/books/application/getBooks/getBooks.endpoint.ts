import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetBooksQuery } from "./getBooks.query";
import { GetBooksRequestQuery } from "./getBooks.request-query";
import { GetBooksQueryResponse } from "./getBooks.response";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";

@ApiTags("Book")
@Controller({
  path: "books",
  version: "1",
})
export class GetBooksEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get all Books" })
  @Get()
  public get(
    @Query() query: GetBooksRequestQuery
  ): Promise<PaginatedOutputDto<GetBooksQueryResponse>> {
    return this.queryBus.execute<
      GetBooksQuery,
      PaginatedOutputDto<GetBooksQueryResponse>
    >(new GetBooksQuery(query));
  }
}
