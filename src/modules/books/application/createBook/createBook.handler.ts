import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateBookCommand } from "./createBook.command";
import { CreateBookRequestBody } from "./createBook.request-body";
import { PrismaService } from "src/database";
import { ValidationService } from "src/modules/services/validation.service";

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private readonly dbContext: PrismaService, private readonly validationService: ValidationService) {}

  public async execute(command: CreateBookCommand) {
    await this.createBook(command.body);
  }

  private async createBook(body: CreateBookRequestBody) {
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

    await this.validationService.validateAuthorsExists([...new Set(authorIds)]);
    
    const book = await this.dbContext.book.create({
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
        sourceId: 2,
      },
    });

    if (authorIds?.length) {
      await this.dbContext.authorToBook.createMany({
        data: authorIds.map((authorId) => ({ bookId: book.id, authorId })),
      });
    }
  }
}
