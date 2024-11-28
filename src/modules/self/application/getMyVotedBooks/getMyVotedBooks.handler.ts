import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { GetMyVotedBooksQueryResponse } from "./getMyVotedBooks.response";
import { GetMyVotedBooksQuery } from "./getMyVotedBooks.query";
import * as _ from "lodash";
import { Prisma } from "@prisma/client";
import { filterString } from "src/common/utils/string";

@QueryHandler(GetMyVotedBooksQuery)
export class GetMyVotedBooksHandler implements IQueryHandler<GetMyVotedBooksQuery> {
  constructor(private readonly dbContext: PrismaService) { }

  public async execute({
    userId, query
  }: GetMyVotedBooksQuery): Promise<GetMyVotedBooksQueryResponse> {

    const { perPage, page } = query;

    const { total, interactions } = await this.getMyVotedBooks({ userId, query });

    const response = {
      meta: {
        page,
        perPage,
        total,
      },
      data: interactions.map(i => i.book),
    };

    return response as GetMyVotedBooksQueryResponse;
  }

  private async getMyVotedBooks({ userId, query }: GetMyVotedBooksQuery) {
    const { search, order, page, perPage } = query;

    const andWhereConditions: Prisma.Enumerable<Prisma.InteractionWhereInput> = [{
      userId
    }];


    if (search) {
      andWhereConditions.push({
        book: {
          title: filterString(search),
        }
      });
    }

    const [total, interactions] = await Promise.all([
      this.dbContext.interaction.count({
        where: {
          AND: andWhereConditions,
        },
      }),
      this.dbContext.interaction.findMany({
        where: {
          AND: andWhereConditions,
        },
        select: {
          book: {
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
            }
          }
        },
        orderBy: this.getOrderBy(order),
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    return { total, interactions };

  }

  private getOrderBy(order?: string) {
    if (!order) {
      return {
        book: {
          createdAt: Prisma.SortOrder.desc,
        }
      };
    }
    const [field, direction] = order.split(":");

    return {
      book: { [field]: direction }
    };
  }
}
