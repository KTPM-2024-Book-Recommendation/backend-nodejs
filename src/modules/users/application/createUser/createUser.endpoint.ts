import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserCommand } from "./createUser.command";
import { CreateUserRequestBody } from "./createUser.request-body";
import { RoleType } from "@prisma/client";
import { Role } from "src/common/role/role.decorator";
import { RoleGuard } from "src/common/role/role.guard";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

@ApiTags("User")
@Controller({
  path: "users",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class CreateUserEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Create an user" })
  @Post()
  public create(@Body() body: CreateUserRequestBody): Promise<LoginUserDto> {
    return this.commandBus.execute<CreateUserCommand, LoginUserDto>(
      new CreateUserCommand(body)
    );
  }
}
