import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetNumberOfBooksBySourceQuery } from "./getNumberOfBooksBySource.query";
import { GetNumberOfBooksBySourceQueryResponse } from "./getNumberOfBooksBySource.response";

@ApiTags("Book")
@Controller({
  path: "number-of-books",
  version: "1",
})
export class GetNumberOfBooksBySourceEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get Number Of Books By Source" })
  @Get()
  public get(
  ): Promise<GetNumberOfBooksBySourceQueryResponse> {
    return this.queryBus.execute<GetNumberOfBooksBySourceQuery, GetNumberOfBooksBySourceQueryResponse>(
      new GetNumberOfBooksBySourceQuery()
    );
  }
}
