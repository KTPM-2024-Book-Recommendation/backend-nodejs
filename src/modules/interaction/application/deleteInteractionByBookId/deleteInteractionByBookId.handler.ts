import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { DeleteReactionByBookIdCommand } from "./deleteInteractionByBookId.command";

@CommandHandler(DeleteReactionByBookIdCommand)
export class DeleteReactionByBookIdHandler
  implements ICommandHandler<DeleteReactionByBookIdCommand>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: DeleteReactionByBookIdCommand): Promise<void> {
    const { bookId, userId, type } = command;

    await this.validate(command);

    await this.dbContext.interaction.delete({
      where: {
        userId_bookId_type: {
          userId,
          bookId,
          type,
        },
      },
    });
  }

  private async validate(command: DeleteReactionByBookIdCommand) {
    const [book, user] = await Promise.all([
      this.dbContext.book.findUnique({
        where: { id: command.bookId },
        select: { id: true },
      }),

      this.dbContext.user.findUnique({
        where: { id: command.userId },
        select: { id: true },
      }),
    ]);

    if (!book?.id) {
      throw new NotFoundException("The book does not exist.");
    }

    if (!user?.id) {
      throw new NotFoundException("The user does not exist.");
    }
  }
}
