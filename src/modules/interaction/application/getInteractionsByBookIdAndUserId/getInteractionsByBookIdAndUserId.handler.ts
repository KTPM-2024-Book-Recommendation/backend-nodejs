import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database";
import { GetInteractionsByBookIdAndUserIdQuery } from "./getInteractionsByBookIdAndUserId.query";
import { GetInteractionsByBookIdAndUserIdQueryResponse } from "./getInteractionsByBookIdAndUserId.response";
import * as _ from "lodash";
import { NotFoundException } from "@nestjs/common";
import { GetInteractionsOrderByEnum } from "src/modules/interaction/interaction.enum";

@QueryHandler(GetInteractionsByBookIdAndUserIdQuery)
export class GetInteractionsByBookIdAndUserIdHandler
  implements IQueryHandler<GetInteractionsByBookIdAndUserIdQuery>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute({
    bookId, userId
  }: GetInteractionsByBookIdAndUserIdQuery): Promise<GetInteractionsByBookIdAndUserIdQueryResponse> {
    const interactions = await this.getInteractions({
      bookId, userId
    });


    return {data: interactions} as GetInteractionsByBookIdAndUserIdQueryResponse;
  }

  private async getInteractions(options: GetInteractionsByBookIdAndUserIdQuery) {
    const {
      bookId, userId
    } = options;

    await this.validate(bookId, userId);

    const interactions = this.dbContext.interaction.findMany({
      where: {
        AND: { bookId, userId },
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
    });

    return interactions;
  }

  private async validate(bookId: string, userId: string) {
    const book = await this.dbContext.book.findUnique({
      where: {
        id: bookId,
      },
      select: {
        id: true,
      },
    });

    if (!book) {
      throw new NotFoundException("This book is not found");
    }

    const user = await this.dbContext.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException("This user is not found");
    }
  }
}
