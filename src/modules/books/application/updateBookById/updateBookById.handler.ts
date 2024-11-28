import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as dayjs from "dayjs";
import { UpdateBookByIdCommand } from "./updateBookById.command";
import { UpdateBookByIdRequestBody } from "./updateBookById.request-body";
import { PrismaService } from "src/database";

@CommandHandler(UpdateBookByIdCommand)
export class UpdateBookByIdHandler
  implements ICommandHandler<UpdateBookByIdCommand>
{
  constructor(private readonly dbContext: PrismaService) {}

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

    await this.validate({ id, authorIds: [...new Set(authorIds)] });

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

  async validate(option: { id: string; authorIds: string[] }) {
    const { id, authorIds } = option;

    const [book, authors] = await Promise.all([
      this.dbContext.book.findUnique({
        where: { id },
        select: {
          id: true,
        },
      }),
      this.dbContext.author.findMany({
        where: {
          id: {
            in: authorIds,
          },
        },
      }),
    ]);

    if (book?.id) {
      throw new NotFoundException("Book not found");
    }

    if (authors.length !== authorIds.length) {
      throw new NotFoundException("Authors not found");
    }
  }
}
