import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateBookByIdCommand } from "./updateBookById.command";
import { UpdateBookByIdRequestBody } from "./updateBookById.request-body";
import { PrismaService } from "src/database";
import { ValidationService } from "src/modules/services/validation.service";

@CommandHandler(UpdateBookByIdCommand)
export class UpdateBookByIdHandler
  implements ICommandHandler<UpdateBookByIdCommand>
{
  constructor(private readonly dbContext: PrismaService, private readonly validationService: ValidationService) {}

  public async execute(command: UpdateBookByIdCommand): Promise<void> {
    return this.updateBookById(command.id, command.body);
  }

  private async updateBookById(
    id: string,
    body: UpdateBookByIdRequestBody
  ): Promise<void> {
    const {
      title,
      description,
      bookCover,
      language,
      imageUrl,
      releaseDate,
      publisher,
      numberOfPages,
      price,
      averageRating,
      numberOfRatings,
      numberOfReviews,
      authorIds,
    } = body;

    await Promise.all([
      this.validationService.validateBookExists(id),
      this.validationService.validateAuthorsExists([...new Set(authorIds)])
    ])

    const book = await this.dbContext.book.update({
      where: { id },
      data: {
        title,
        description,
        bookCover,
        language,
        imageUrl,
        releaseDate,
        publisher,
        numberOfPages,
        price,
        averageRating,
        numberOfRatings,
        numberOfReviews,
      },
    });

    await this.dbContext.authorToBook.createMany({
      data: authorIds.map((authorId) => ({ bookId: book.id, authorId })),
    });
  }
}
