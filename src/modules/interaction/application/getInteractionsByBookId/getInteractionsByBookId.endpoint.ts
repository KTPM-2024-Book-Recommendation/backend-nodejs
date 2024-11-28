import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { GetInteractionsByBookIdQuery } from "./getInteractionsByBookId.query";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";
import { GetInteractionsByBookIdRequestQuery } from "./getInteractionsByBookId.request-query";
import { GetInteractionsByBookIdRequestParam } from "./getInteractionsByBookId.request-param";
import { GetInteractionsByBookIdQueryResponse } from "./getInteractionsByBookId.response";

@ApiTags("Interaction")
@Controller({
  path: "interactions",
  version: "1",
})
export class GetInteractionsByBookIdEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get all Interactions by the specified news" })
  @Get(":bookId")
  public get(
    @Param() { bookId: BookId }: GetInteractionsByBookIdRequestParam,
    @Query() query: GetInteractionsByBookIdRequestQuery
  ): Promise<PaginatedOutputDto<GetInteractionsByBookIdQueryResponse>> {
    return this.queryBus.execute<
      GetInteractionsByBookIdQuery,
      PaginatedOutputDto<GetInteractionsByBookIdQueryResponse>
    >(new GetInteractionsByBookIdQuery(BookId, query));
  }
}
