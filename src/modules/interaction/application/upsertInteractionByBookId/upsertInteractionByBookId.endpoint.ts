import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpsertInteractionByBookIdRequestBody } from "./upsertInteractionByBookId.request-body";
import { UpsertInteractionByBookIdCommand } from "./upsertInteractionByBookId.command";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { RequestUser } from "src/common/decorator/requestUser.decorator";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

@ApiTags("Interaction")
@ApiBearerAuth()
@Controller({
  path: "interactions",
  version: "1",
})
@UseGuards(AuthenGuard)
export class UpdateInteractionByBookIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Upsert a reaction" })
  @Post()
  public update(
    @Body() body: UpsertInteractionByBookIdRequestBody,
    @RequestUser() user: LoginUserDto
  ): Promise<void> {
    return this.commandBus.execute<UpsertInteractionByBookIdCommand, void>(
      new UpsertInteractionByBookIdCommand(user.id, body)
    );
  }
}
