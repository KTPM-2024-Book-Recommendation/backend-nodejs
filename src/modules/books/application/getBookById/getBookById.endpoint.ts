import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetBookByIdQuery } from "./getBookById.query";
import { GetBookByIdRequestParam } from "./getBookById.request-param";
import { GetBookByIdQueryResponse } from "./getBookById.response";

@ApiTags("Book")
@Controller({
  path: "books",
  version: "1",
})
export class GetBookByIdEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get Book by id" })
  @Get(":id")
  public get(
    @Param() { id }: GetBookByIdRequestParam
  ): Promise<GetBookByIdQueryResponse> {
    return this.queryBus.execute<GetBookByIdQuery, GetBookByIdQueryResponse>(
      new GetBookByIdQuery(id)
    );
  }
}
