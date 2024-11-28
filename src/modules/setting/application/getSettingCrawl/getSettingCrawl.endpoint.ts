import { Controller, Get, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetSettingCrawlQueryResponse } from "./getSettingCrawl.response";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetSettingCrawlQuery } from "./getSettingCrawl.query";

@ApiTags("Setting")
@Controller({
  path: "setting-crawl",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class GetSettingCrawlEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get user by id" })
  @Get()
  public get(): Promise<GetSettingCrawlQueryResponse> {
    return this.queryBus.execute<
      GetSettingCrawlQuery,
      GetSettingCrawlQueryResponse
    >(new GetSettingCrawlQuery());
  }
}
