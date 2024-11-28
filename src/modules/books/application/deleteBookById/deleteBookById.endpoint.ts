import {
  Controller,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeleteBookByIdCommand } from "./deleteBookById.command";
import { DeleteBookByIdRequestParam } from "./deleteBookById.request-param";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("Book")
@Controller({
  path: "books",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class DeleteBookByIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Delete Book by id" })
  @Delete(":id")
  public delete(@Param() { id }: DeleteBookByIdRequestParam): Promise<void> {
    return this.commandBus.execute<DeleteBookByIdCommand, void>(
      new DeleteBookByIdCommand(id)
    );
  }
}
