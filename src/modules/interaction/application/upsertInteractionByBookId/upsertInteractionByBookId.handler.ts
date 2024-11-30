import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { UpsertInteractionByBookIdCommand } from "./upsertInteractionByBookId.command";
import { InteractionType } from "@prisma/client";
import { ValidationService } from "src/modules/services/validation.service";

@CommandHandler(UpsertInteractionByBookIdCommand)
export class UpdateUserByIdHandler
  implements ICommandHandler<UpsertInteractionByBookIdCommand> {
  constructor(private readonly dbContext: PrismaService, private readonly validationService: ValidationService) { }

  public async execute(
    command: UpsertInteractionByBookIdCommand
  ): Promise<void> {
    const {
      userId,
      body: { bookId, type, value },
    } = command;

    const [book, user] = await Promise.all([
      this.validationService.validateBookExists(bookId),
      this.validationService.validateUserExists(userId)
    ])

    const { oldValue, newValue, existedInteraction } = await this.getValue({ bookId, type, value, userId });

    await this.dbContext.$transaction(async (trx) => {
      await trx.interaction.upsert({
        where: {
          userId_bookId_type: {
            bookId,
            userId,
            type,
          },
        },
        create: {
          bookId,
          userId,
          type,
          value: newValue,
        },
        update: {
          value: newValue,
        },
      });

      if (type === InteractionType.RATING) {
        let newNumberOfRatings = 0;
        let newAvgRating = 0;

        if (existedInteraction) {
          newNumberOfRatings = book.numberOfRatings;
          newAvgRating = 
            (book.averageRating * book.numberOfRatings - oldValue + newValue) / newNumberOfRatings;
        } else {
          newNumberOfRatings = (book.numberOfRatings + 1);
          newAvgRating = (book.averageRating * book.numberOfRatings + newValue) / newNumberOfRatings;
        }

        await trx.book.update({
          where: {
            id: bookId
          },
          data: {
            averageRating: newAvgRating,
            numberOfRatings: newNumberOfRatings
          }
        });
      }
    })
  }

  private async getValue(options: {
    type: InteractionType;
    value: number;
    bookId: string;
    userId: string;
  }) {
    const { type, value, bookId, userId } = options;


    const prevInteraction = await this.dbContext.interaction.findUnique({
      where: {
        userId_bookId_type: {
          bookId,
          userId,
          type,
        },
      },
      select: {
        value: true,
      },
    });

    return {
      oldValue: prevInteraction?.value ?? 0,
      newValue:
        type === InteractionType.RATING
          ? value : prevInteraction
            ? prevInteraction.value + 1 : 1,
      existedInteraction: Boolean(prevInteraction)
    };
  }
}
