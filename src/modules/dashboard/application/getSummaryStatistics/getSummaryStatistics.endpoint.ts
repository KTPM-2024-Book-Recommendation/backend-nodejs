import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetSummaryStatisticsQueryResponse } from "./getSummaryStatistics.response";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetSummaryStatisticsQuery } from "./getSummaryStatistics.query";

@ApiTags("Dashboard")
@Controller({
  path: "dashboard/summary-statistics",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class GetSummaryStatisticsEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get statistics about crawled books" })
  @Get()
  public get(): Promise<GetSummaryStatisticsQueryResponse> {
    return this.queryBus.execute<
      GetSummaryStatisticsQuery,
      GetSummaryStatisticsQueryResponse
    >(new GetSummaryStatisticsQuery());
  }
}
