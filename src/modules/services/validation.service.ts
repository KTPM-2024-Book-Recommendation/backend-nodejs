import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database";

@Injectable()
export class ValidationService {
  constructor(private readonly dbContext: PrismaService) {}

  public async validateBookExists(bookId: string) {
    const book = await this.dbContext.book.findUnique({
      where: { id: bookId },
      select: { id: true, averageRating: true, numberOfRatings: true },
    });

    if (!book) {
      throw new NotFoundException("Book not found!");
    }

    return book;
  }

  public async validateUserExists(userId: string) {
    const user = await this.dbContext.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException("User not found!");
    }
    return user;
  }

  public async validateAuthorsExists(authorIds: string[]) {
    const authors = await this.dbContext.author.findMany({
      where: {
        id: {
          in: authorIds,
        },
      },
    });

    if (authors.length !== authorIds.length) {
      throw new NotFoundException("Authors not found!");
    }
  }
}
