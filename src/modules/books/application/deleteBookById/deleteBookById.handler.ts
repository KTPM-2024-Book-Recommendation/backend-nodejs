import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteBookByIdCommand } from "./deleteBookById.command";
import { PrismaService } from "src/database";

@CommandHandler(DeleteBookByIdCommand)
export class DeleteBookByIdHandler
  implements ICommandHandler<DeleteBookByIdCommand>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: DeleteBookByIdCommand): Promise<void> {
    await this.deleteBookById(command.id);
  }

  private async deleteBookById(bookId: string) {
    const Book = await this.dbContext.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!Book) {
      throw new NotFoundException("The account does not exist.");
    }

    await this.dbContext.book.delete({ where: { id: bookId } });
  }
}
