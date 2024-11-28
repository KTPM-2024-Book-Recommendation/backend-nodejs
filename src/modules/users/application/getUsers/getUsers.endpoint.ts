import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUsersQuery } from "./getUsers.query";
import { GetUsersRequestQuery } from "./getUsers.request-query";
import { GetUsersQueryResponse } from "./getUsers.response";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { RoleGuard } from "src/common/role/role.guard";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("User")
@Controller({
  path: "users",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class GetUsersEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get all users" })
  @Get()
  public get(
    @Query() query: GetUsersRequestQuery
  ): Promise<PaginatedOutputDto<GetUsersQueryResponse>> {
    return this.queryBus.execute<
      GetUsersQuery,
      PaginatedOutputDto<GetUsersQueryResponse>
    >(new GetUsersQuery(query));
  }
}
