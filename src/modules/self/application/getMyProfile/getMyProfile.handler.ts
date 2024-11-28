import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { GetMyProfileQueryResponse } from "./getMyProfile.response";
import { GetMyProfileQuery } from "./getMyProfile.query";
import * as _ from "lodash";

@QueryHandler(GetMyProfileQuery)
export class GetMyProfileHandler implements IQueryHandler<GetMyProfileQuery> {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute({
    userId,
  }: GetMyProfileQuery): Promise<GetMyProfileQueryResponse> {
    const user = await this.dbContext.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        avatar: true,
        email: true,
        name: true,
        dob: true,
        country: true,
        gender: true,
        loginType: true,
        role: {
          select: {
            type: true,
          },
        },
      },
    });

    return user;
  }
}
