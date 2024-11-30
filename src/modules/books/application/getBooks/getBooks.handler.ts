import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { GetBooksQuery } from "./getBooks.query";
import { GetBooksRequestQuery, MinMaxValue } from "./getBooks.request-query";
import { GetBooksQueryResponse, GetBooksResponse } from "./getBooks.response";
import { filterString } from "src/common/utils/string";
import { PrismaService } from "src/database";
import { BadRequestException } from "@nestjs/common";

@QueryHandler(GetBooksQuery)
export class GetBooksHandler implements IQueryHandler<GetBooksQuery> {
  constructor(private readonly dbContext: PrismaService) { }

  public async execute({
    query,
  }: GetBooksQuery): Promise<GetBooksQueryResponse> {
    const { perPage, page } = query;

    const { total, books } = await this.getBooks(query);

    const response = {
      meta: {
        page,
        perPage,
        total,
      },
      data: books,
    };

    return response as GetBooksQueryResponse;
  }

  private getMinMaxCondition({ min, max }: MinMaxValue) {
    if (min && max && min >= max) {
      throw new BadRequestException(
        "Min must be less than or equal to max value"
      );
    }

    const condition: { [key: string]: number } = {};
    if (min !== undefined) {
      condition.gte = min;
    }
    if (max !== undefined) {
      condition.lte = max;
    }

    return condition;
  }

  private async getBooks(options: GetBooksRequestQuery) {
    const { search, languages, price, averageRating, page, perPage, order, allowOrderFieldNull } =
      options;

    const andWhereConditions: Prisma.Enumerable<Prisma.BookWhereInput> = [];

    if (search) {
      andWhereConditions.push({
        OR: [
          {
            title: filterString(search),
          },
          {
            bookCover: filterString(search),
          },
          {
            publisher: filterString(search),
          },
          {
            authors: {
              some: {
                author: {
                  name: filterString(search),
                },
              },
            },
          },
        ],
      });
    }

    if (languages?.length) {
      andWhereConditions.push({
        language: {
          in: languages,
        },
      });
    }

    if (price) {
      andWhereConditions.push({
        price: this.getMinMaxCondition(price),
      });
    }

    if (averageRating) {
      andWhereConditions.push({
        price: this.getMinMaxCondition(averageRating),
      });
    }

    if (!allowOrderFieldNull) {
      const orderEmlements = order?.split(":");

      if (orderEmlements?.length == 2) {
        const orderField = orderEmlements[0];

        andWhereConditions.push({
          [orderField]: {
            not: null
          }
        });
      }
    }

    const [total, books] = await Promise.all([
      this.dbContext.book.count({
        where: {
          AND: andWhereConditions,
        },
      }),
      this.dbContext.book.findMany({
        where: {
          AND: andWhereConditions,
        },
        select: {
          id: true,
          title: true,
          bookCover: true,
          language: true,
          imageUrl: true,
          releaseDate: true,
          price: true,
          averageRating: true,
          numberOfRatings: true,
          numberOfPages: true,
          numberOfReviews: true,
          publisher: true,
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
        orderBy: this.getOrderBy(order),
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    return { total, books };
  }

  private getOrderBy(order?: string): { [key: string]: string } {
    if (!order) {
      return {
        createdAt: Prisma.SortOrder.desc,
      };
    }
    const [field, direction] = order.split(":");

    return { [field]: direction };
  }
}
