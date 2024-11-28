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
import { UpdateBookByIdCommand } from "./updateBookById.command";
import { UpdateBookByIdRequestBody } from "./updateBookById.request-body";
import { UpdateBookByIdRequestParam } from "./updateBookById.request-param";
import { RoleGuard } from "src/common/role/role.guard";
import { RoleType } from "@prisma/client";
import { Role } from "src/common/role/role.decorator";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("Book")
@Controller({
  path: "books",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class UpdateBookByIdEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Update Book by id" })
  @Put(":id")
  public update(
    @Param() { id }: UpdateBookByIdRequestParam,
    @Body() body: UpdateBookByIdRequestBody
  ): Promise<void> {
    return this.commandBus.execute<UpdateBookByIdCommand, void>(
      new UpdateBookByIdCommand(id, body)
    );
  }
}
