import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetInteractionsByBookIdAndUserIdQuery } from "./getInteractionsByBookIdAndUserId.query";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";
import { GetInteractionsByBookIdAndUserIdRequestParam } from "./getInteractionsByBookIdAndUserId.request-param";
import { GetInteractionsByBookIdAndUserIdQueryResponse } from "./getInteractionsByBookIdAndUserId.response";

@ApiTags("Interaction")
@Controller({
  path: "interactions",
  version: "1",
})
export class GetInteractionsByBookIdAndUserIdEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get all Interactions by the specified book and user" })
  @Get(":bookId/:userId")
  public get(
    @Param() { bookId, userId }: GetInteractionsByBookIdAndUserIdRequestParam,
  ): Promise<PaginatedOutputDto<GetInteractionsByBookIdAndUserIdQueryResponse>> {
    return this.queryBus.execute<
      GetInteractionsByBookIdAndUserIdQuery,
      PaginatedOutputDto<GetInteractionsByBookIdAndUserIdQueryResponse>
    >(new GetInteractionsByBookIdAndUserIdQuery(bookId, userId));
  }
}
