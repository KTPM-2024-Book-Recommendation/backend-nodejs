import {
  Controller,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteReactionByBookIdRequestParam } from "./deleteInteractionByBookId.request-param";
import { DeleteReactionByBookIdCommand } from "./deleteInteractionByBookId.command";
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
export class DeleteReactionByBookIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Delete Interaction By Book Id" })
  @Delete(":bookId:type")
  public delete(
    @Param() { bookId, type }: DeleteReactionByBookIdRequestParam,
    @RequestUser() user: LoginUserDto
  ): Promise<void> {
    return this.commandBus.execute<DeleteReactionByBookIdCommand, void>(
      new DeleteReactionByBookIdCommand(bookId, user.id, type)
    );
  }
}
