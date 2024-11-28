import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetCrawledStatisticsMonthlyQueryResponse } from "./getCrawledStatisticsMonthly.response";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetCrawledStatisticsMonthlyQuery } from "./getCrawledStatisticsMonthly.query";

@ApiTags("Dashboard")
@Controller({
  path: "dashboard/monthly-crawl-statistics",
  version: "1",
})
@ApiBearerAuth()
export class GetCrawledStatisticsMonthlyEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get statistics about crawling monthly in current year" })
  @Get()
  public get(): Promise<GetCrawledStatisticsMonthlyQueryResponse> {
    return this.queryBus.execute<
      GetCrawledStatisticsMonthlyQuery,
      GetCrawledStatisticsMonthlyQueryResponse
    >(new GetCrawledStatisticsMonthlyQuery());
  }
}
