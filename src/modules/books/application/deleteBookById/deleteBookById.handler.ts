import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteBookByIdCommand } from "./deleteBookById.command";
import { PrismaService } from "src/database";
import { ValidationService } from "src/modules/services/validation.service";

@CommandHandler(DeleteBookByIdCommand)
export class DeleteBookByIdHandler
  implements ICommandHandler<DeleteBookByIdCommand>
{
  constructor(private readonly dbContext: PrismaService, private readonly validationService: ValidationService) {}

  public async execute(command: DeleteBookByIdCommand): Promise<void> {
    const bookId = command.id;
    await this.validationService.validateBookExists(bookId);
    await this.dbContext.book.delete({ where: { id: bookId } });
  }
}
