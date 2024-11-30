import { NotFoundException } from "@nestjs/common";
import { GetBookByIdQuery } from "./getBookById.query";
import { GetBookByIdQueryResponse } from "./getBookById.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";

@QueryHandler(GetBookByIdQuery)
export class GetBookByIdHandler implements IQueryHandler<GetBookByIdQuery> {
  constructor(private readonly dbContext: PrismaService) {}

  private async getBookById(id: string) {
    const book = await this.dbContext.book.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        bookCover: true,
        language: true,
        imageUrl: true,
        releaseDate: true,
        publisher: true,
        numberOfPages: true,
        price: true,
        averageRating: true,
        numberOfRatings: true,
        numberOfReviews: true,
        createdAt: true,
        authors: {
          select: {
            author: true,
          },
        },
        source: true,
        interactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    if (!book) {
      throw new NotFoundException("The book does not exist.");
    }

    return book;
  }

  public async execute(
    query: GetBookByIdQuery
  ): Promise<GetBookByIdQueryResponse> {
    const book = await this.getBookById(query.id);
    return book;
  }
}
