import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UploadFileCommand } from "./uploadFile.command";
import { AuthenGuard } from "src/common/guard/authen.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadFileResponse } from "./uploadFile.response";

@ApiTags("File")
@Controller({
  path: "files",
  version: "1",
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class UploadFileEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: "Upload file" })
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  public create(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UploadFileResponse> {
    return this.commandBus.execute<UploadFileCommand, UploadFileResponse>(
      new UploadFileCommand(file)
    );
  }
}
