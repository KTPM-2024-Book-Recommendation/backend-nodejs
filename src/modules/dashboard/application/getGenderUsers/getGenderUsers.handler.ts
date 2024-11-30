import { GetGenderUsersQueryResponse } from "./getGenderUsers.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { GetGenderUsersQuery } from "./getGenderUsers.query";
import * as _ from "lodash";

@QueryHandler(GetGenderUsersQuery)
export class GetGenderUsersHandler
  implements IQueryHandler<GetGenderUsersQuery> {
  constructor(
    private readonly dbContext: PrismaService,
  ) { }

  public async execute(
  ): Promise<GetGenderUsersQueryResponse> {
    const users = await this.dbContext.user.groupBy({
      by: ['gender'],
      _count: {
        _all: true,
      },
    });
    return users.map(({ gender, _count }) => ({ gender, count: _count._all }));
  }
}
