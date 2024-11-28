import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database";
import { GetInteractionsByBookIdQuery } from "./getInteractionsByBookId.query";
import { GetInteractionsByBookIdQueryResponse } from "./getInteractionsByBookId.response";
import * as _ from "lodash";
import { NotFoundException } from "@nestjs/common";
import { GetInteractionsOrderByEnum } from "src/modules/interaction/interaction.enum";

@QueryHandler(GetInteractionsByBookIdQuery)
export class GetInteractionsByBookIdHandler
  implements IQueryHandler<GetInteractionsByBookIdQuery>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute({
    query,
    bookId,
  }: GetInteractionsByBookIdQuery): Promise<GetInteractionsByBookIdQueryResponse> {
    const { perPage, page } = query;

    const { total, interactions } = await this.getInteractions({
      query,
      bookId,
    });

    const response = {
      meta: {
        page: page + 1,
        perPage,
        total,
      },
      data: interactions,
    };

    return response as GetInteractionsByBookIdQueryResponse;
  }

  private async getInteractions(options: GetInteractionsByBookIdQuery) {
    const {
      bookId,
      query: { type, page, perPage, order },
    } = options;

    await this.validate(bookId);

    let whereCondition: Prisma.InteractionWhereInput = { bookId };

    if (type) {
      whereCondition = {
        ...whereCondition,
        type,
      };
    }

    const [total, interactions] = await Promise.all([
      this.dbContext.interaction.count({
        where: whereCondition,
      }),
      this.dbContext.interaction.findMany({
        where: {
          AND: whereCondition,
        },
        select: {
          bookId: true,
          type: true,
          value: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: this.getOrderBy(order),
        skip: page * perPage,
        take: perPage,
      }),
    ]);

    return { total, interactions };
  }

  private async validate(bookId: string) {
    const book = await this.dbContext.book.findUnique({
      where: {
        id: bookId,
      },
      select: {
        id: true,
      },
    });

    if (!book) {
      throw new NotFoundException("This news is not found");
    }
  }

  private getOrderBy(order?: string) {
    if (!order) {
      return {
        date: Prisma.SortOrder.desc,
      };
    }
    const [field, direction] = order.split(":");

    if (field === GetInteractionsOrderByEnum.USER_NAME) {
      return {
        user: {
          name: direction as Prisma.SortOrder,
        },
      };
    }

    return { [field]: direction };
  }
}
