import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetCrawledBooksQueryResponse } from "./getCrawledBooks.response";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetCrawledBooksQuery } from "./getCrawledBooks.query";
import { GetCrawledBooksRequestQuery } from "./getCrawledBooks.request-query";

@ApiTags("Dashboard")
@Controller({
  path: "dashboard/crawled-books",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class GetCrawledBooksEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get statistics about crawled books" })
  @Get()
  public get(@Query() query: GetCrawledBooksRequestQuery): Promise<GetCrawledBooksQueryResponse> {
    return this.queryBus.execute<
      GetCrawledBooksQuery,
      GetCrawledBooksQueryResponse
    >(new GetCrawledBooksQuery(query));
  }
}
