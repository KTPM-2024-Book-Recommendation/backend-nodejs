import { GetCrawledBooksQueryResponse } from "./getCrawledBooks.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { GetCrawledBooksQuery } from "./getCrawledBooks.query";
import { DashboardSersvice } from "../../services";
import * as dayjs from "dayjs";

@QueryHandler(GetCrawledBooksQuery)
export class GetCrawledBooksHandler
  implements IQueryHandler<GetCrawledBooksQuery> {
  constructor(
    private readonly dbContext: PrismaService,
    private readonly dashboardService: DashboardSersvice
  ) { }

  public async execute(
    { query }: GetCrawledBooksQuery
  ): Promise<GetCrawledBooksQueryResponse> {
    const crawledDaysBySourceId = await this.dashboardService.getCrawledDaysBySourceId(query.sourceId);
    const result: Record<string, any> = {};

    for (const [sourceName, listCrawlDays] of Object.entries(crawledDaysBySourceId)) {
      const countBooksByCrawlDays = await Promise.all(listCrawlDays.map(async crawlDay => {
        const _count = await this.dbContext.book.count({
          where: {
            source: {
              name: sourceName
            },
            createdAt: {
              gte: crawlDay,
              lt: dayjs(crawlDay).add(3, 'day').toDate()
            }
          }
        });
        return {
          crawlDay,
          _count
        }
      }
      ))
      result[`${sourceName}`] = countBooksByCrawlDays
    }

    return result;
  }
}
