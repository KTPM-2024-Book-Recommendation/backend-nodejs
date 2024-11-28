import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateSettingCrawlRequestBody } from "./updateSettingCrawl.request-body";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { UpdateSettingCrawlCommand } from "./updateSettingCrawl.command";
import { RoleGuard } from "src/common/role/role.guard";
import { Role } from "src/common/role/role.decorator";
import { RoleType } from "@prisma/client";

@ApiTags("Setting")
@Controller({
  path: "setting-crawl",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard, RoleGuard)
@Role(RoleType.ADMIN)
export class UpdateSettingCrawlEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Update setting crawl" })
  @Put()
  public update(@Body() body: UpdateSettingCrawlRequestBody): Promise<void> {
    return this.commandBus.execute<UpdateSettingCrawlCommand, void>(
      new UpdateSettingCrawlCommand(body)
    );
  }
}
