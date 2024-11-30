import { GetCrawledStatisticsMonthlyQueryResponse, GetCrawledStatisticsMonthlyResponse } from "./getCrawledStatisticsMonthly.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { GetCrawledStatisticsMonthlyQuery } from "./getCrawledStatisticsMonthly.query";
import * as _ from "lodash";


@QueryHandler(GetCrawledStatisticsMonthlyQuery)
export class GetCrawledStatisticsMonthlyHandler
  implements IQueryHandler<GetCrawledStatisticsMonthlyQuery> {
  constructor(
    private readonly dbContext: PrismaService,
  ) { }

  public async execute(
  ): Promise<GetCrawledStatisticsMonthlyQueryResponse> {
    const currentYear = new Date().getFullYear().toString();

    const crawledDays = await this.dbContext.$queryRaw`
      SELECT to_char(created_at, 'MM') AS year_month, COUNT(*) AS book_count
      FROM book
      WHERE to_char(created_at, 'YYYY') = ${currentYear}
      GROUP BY to_char(created_at, 'MM');
    ` as GetCrawledStatisticsMonthlyResponse[];

    return {
      data: crawledDays.map( x => ({
        month: x['year_month'],
        bookCount: Math.floor(Number(x['book_count'])),
      }))
    };
  }
}
