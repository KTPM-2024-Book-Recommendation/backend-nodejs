import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database";
import { GetInteractionsByBookIdAndUserIdQuery } from "./getInteractionsByBookIdAndUserId.query";
import { GetInteractionsByBookIdAndUserIdQueryResponse } from "./getInteractionsByBookIdAndUserId.response";
import * as _ from "lodash";
import { NotFoundException } from "@nestjs/common";
import { ValidationService } from "src/modules/services/validation.service";

@QueryHandler(GetInteractionsByBookIdAndUserIdQuery)
export class GetInteractionsByBookIdAndUserIdHandler
  implements IQueryHandler<GetInteractionsByBookIdAndUserIdQuery>
{
  constructor(private readonly dbContext: PrismaService, private readonly validationService: ValidationService) {}

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

    await Promise.all([
      this.validationService.validateBookExists(bookId),
      this.validationService.validateUserExists(userId)
    ])

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
}
