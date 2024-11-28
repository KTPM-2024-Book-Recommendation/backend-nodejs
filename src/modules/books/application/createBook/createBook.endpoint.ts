import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateBookCommand } from "./createBook.command";
import { CreateBookRequestBody } from "./createBook.request-body";
import { RoleType } from "@prisma/client";
import { Role } from "src/common/role/role.decorator";
import { RoleGuard } from "src/common/role/role.guard";
import { AuthenGuard } from "src/common/guard/authen.guard";

@ApiTags("Book")
@Controller({
  path: "books",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class CreateBookEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Create an Book" })
  @Post()
  public create(@Body() body: CreateBookRequestBody): Promise<void> {
    return this.commandBus.execute<CreateBookCommand, void>(
      new CreateBookCommand(body)
    );
  }
}
