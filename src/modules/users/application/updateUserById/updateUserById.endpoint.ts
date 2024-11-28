import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateUserByIdCommand } from "./updateUserById.command";
import { UpdateUserByIdRequestBody } from "./updateUserById.request-body";
import { UpdateUserByIdRequestParam } from "./updateUserById.request-param";
import { RoleGuard } from "src/common/role/role.guard";
import { RoleType } from "@prisma/client";
import { Role } from "src/common/role/role.decorator";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("User")
@Controller({
  path: "users",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class UpdateUserByIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Update user by id" })
  @Put(":id")
  public update(
    @Param() { id }: UpdateUserByIdRequestParam,
    @Body() body: UpdateUserByIdRequestBody
  ): Promise<void> {
    return this.commandBus.execute<UpdateUserByIdCommand, void>(
      new UpdateUserByIdCommand(id, body)
    );
  }
}
