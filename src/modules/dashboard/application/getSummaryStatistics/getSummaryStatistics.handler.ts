import { GetSummaryStatisticsQueryResponse } from "./getSummaryStatistics.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { GetSummaryStatisticsQuery } from "./getSummaryStatistics.query";
import * as _ from "lodash";
import { DashboardSersvice } from "../../services";

@QueryHandler(GetSummaryStatisticsQuery)
export class GetSummaryStatisticsHandler
  implements IQueryHandler<GetSummaryStatisticsQuery> {
  constructor(
    private readonly dbContext: PrismaService,
    private readonly dashboardService: DashboardSersvice,
  ) { }

  public async execute(
    query: GetSummaryStatisticsQuery
  ): Promise<GetSummaryStatisticsQueryResponse> {
    const sources = await this.dbContext.source.findMany(
      {
        select: {
          id: true,
          name: true,
          _count: true
        }
      }
    );

    const crawledDays = await this.dashboardService.getCrawledDaysBySourceId();

    const numberOfUsers = await this.dbContext.user.count()

    return {
      numberOfUsers,
      sources: sources.map(x => ({
        id: x.id,
        name: x.name,
        numberOfBooks: x._count.books
      })),
      crawledDays,
    };
  }
}
