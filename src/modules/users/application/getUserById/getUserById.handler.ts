import { NotFoundException } from "@nestjs/common";
import { GetUserByIdQuery } from "./getUserById.query";
import { GetUserByIdQueryResponse } from "./getUserById.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly dbContext: PrismaService) {}

  private async getUserById(id: string) {
    const user = await this.dbContext.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        avatar: true,
        gender: true,
        dob: true,
        role: {
          select: {
            id: true,
            type: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException("The account does not exist.");
    }

    return {
      ...user,
      role: user.role.type,
    };
  }

  public async execute(
    query: GetUserByIdQuery
  ): Promise<GetUserByIdQueryResponse> {
    const user = await this.getUserById(query.id);
    return user;
  }
}
