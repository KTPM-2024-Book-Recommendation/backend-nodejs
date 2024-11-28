import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetGenderUsersQueryResponse } from "./getGenderUsers.response";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { GetGenderUsersQuery } from "./getGenderUsers.query";

@ApiTags("Dashboard")
@Controller({
  path: "dashboard/gender-users",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class GetGenderUsersEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get statistics about crawled books" })
  @Get()
  public get(): Promise<GetGenderUsersQueryResponse> {
    return this.queryBus.execute<
      GetGenderUsersQuery,
      GetGenderUsersQueryResponse
    >(new GetGenderUsersQuery());
  }
}
