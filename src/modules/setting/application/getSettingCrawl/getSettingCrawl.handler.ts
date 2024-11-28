import { NotFoundException } from "@nestjs/common";
import { GetSettingCrawlQueryResponse } from "./getSettingCrawl.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { GetSettingCrawlQuery } from "./getSettingCrawl.query";

@QueryHandler(GetSettingCrawlQuery)
export class GetSettingCrawlHandler
  implements IQueryHandler<GetSettingCrawlQuery>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(
    query: GetSettingCrawlQuery
  ): Promise<GetSettingCrawlQueryResponse> {
    const settingCrawl = await this.dbContext.settingCrawl.findFirst();
    return settingCrawl;
  }
}
