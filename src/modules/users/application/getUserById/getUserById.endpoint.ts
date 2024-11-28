import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUserByIdQuery } from "./getUserById.query";
import { GetUserByIdRequestParam } from "./getUserById.request-param";
import { GetUserByIdQueryResponse } from "./getUserById.response";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("User")
@Controller({
  path: "users",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class GetUserByIdEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: "Get user by id" })
  @Get(":id")
  public get(
    @Param() { id }: GetUserByIdRequestParam
  ): Promise<GetUserByIdQueryResponse> {
    return this.queryBus.execute<GetUserByIdQuery, GetUserByIdQueryResponse>(
      new GetUserByIdQuery(id)
    );
  }
}
