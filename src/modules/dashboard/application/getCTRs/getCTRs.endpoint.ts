import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetCTRsQueryResponse } from "./getCTRs.response";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetCTRsQuery } from "./getCTRs.query";

@ApiTags("Dashboard")
@Controller({
  path: "dashboard/ctr",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class GetCTRsEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get clickthrough rate of system" })
  @Get()
  public get(): Promise<GetCTRsQueryResponse> {
    return this.queryBus.execute<
      GetCTRsQuery,
      GetCTRsQueryResponse
    >(new GetCTRsQuery());
  }
}
