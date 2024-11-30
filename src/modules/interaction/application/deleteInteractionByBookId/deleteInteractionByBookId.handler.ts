import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { DeleteReactionByBookIdCommand } from "./deleteInteractionByBookId.command";
import { ValidationService } from "src/modules/services/validation.service";

@CommandHandler(DeleteReactionByBookIdCommand)
export class DeleteReactionByBookIdHandler
  implements ICommandHandler<DeleteReactionByBookIdCommand>
{
  constructor(private readonly dbContext: PrismaService, private readonly validationService: ValidationService) {}

  public async execute(command: DeleteReactionByBookIdCommand): Promise<void> {
    const { bookId, userId, type } = command;

    await Promise.all([
      this.validationService.validateBookExists(bookId),
      this.validationService.validateUserExists(userId)
    ])

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
}
