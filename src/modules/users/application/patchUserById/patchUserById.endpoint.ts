import {
  Body,
  Controller,
  Param,
  Patch,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PatchUserByIdRequestBody } from "./patchUserById.request-body";
import { PatchUserByIdCommand } from "./patchUserById.command";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { RequestUser } from "src/common/decorator/requestUser.decorator";

@ApiTags("User")
@Controller({
  path: "users",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class PatchUserByIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Patch user by id" })
  @Patch()
  public update(
    @RequestUser() user,
    @Body() body: PatchUserByIdRequestBody
  ): Promise<void> {
    return this.commandBus.execute<PatchUserByIdCommand, void>(
      new PatchUserByIdCommand(user.id, body)
    );
  }
}
