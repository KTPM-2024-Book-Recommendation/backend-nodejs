import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Prisma } from "@prisma/client";
import { GetUsersQuery } from "./getUsers.query";
import { GetUsersRequestQuery } from "./getUsers.request-query";
import { GetUsersQueryResponse, GetUsersResponse } from "./getUsers.response";
import { filterString } from "src/common/utils/string";
import { GetUsersDto } from "./getUsers.dto";
import { PrismaService } from "src/database";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute({
    query,
  }: GetUsersQuery): Promise<GetUsersQueryResponse> {
    const { perPage, page } = query;

    const { total, users } = await this.getUsers(query);

    const response = {
      meta: {
        page: page + 1,
        perPage,
        total,
      },
      data: users.map((user) => this.map(user)),
    };

    return response as GetUsersQueryResponse;
  }

  private async getUsers(options: GetUsersRequestQuery) {
    const { search, genders, page, perPage, order, roleIds } = options;

    const andWhereConditions: Prisma.Enumerable<Prisma.UserWhereInput> = [];

    if (search) {
      andWhereConditions.push({
        OR: [
          {
            name: filterString(search),
          },
          {
            email: filterString(search),
          },
          {
            country: filterString(search),
          },
        ],
      });
    }

    if (roleIds?.length) {
      andWhereConditions.push({
        role: {
          id: {
            in: roleIds,
          },
        },
      });
    }

    if (genders?.length) {
      andWhereConditions.push({
        gender: {
          in: genders,
        },
      });
    }

    const [total, users] = await Promise.all([
      this.dbContext.user.count({
        where: {
          AND: andWhereConditions,
        },
      }),
      this.dbContext.user.findMany({
        where: {
          AND: andWhereConditions,
        },
        select: {
          id: true,
          name: true,
          gender: true,
          email: true,
          country: true,
          avatar: true,
          dob: true,
          role: {
            select: {
              type: true,
            },
          },
        },
        orderBy: this.getOrderBy(order),
        skip: page * perPage,
        take: perPage,
      }),
    ]);

    return { total, users };
  }

  private map(user: GetUsersDto): GetUsersResponse {
    return {
      ...user,
      role: user.role.type,
    };
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
