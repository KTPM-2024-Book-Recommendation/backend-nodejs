import { GetCTRsQueryResponse } from "./getCTRs.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { GetCTRsQuery } from "./getCTRs.query";
import * as _ from "lodash";
import { InteractionType, ModelType } from "@prisma/client";

@QueryHandler(GetCTRsQuery)
export class GetCTRsHandler
  implements IQueryHandler<GetCTRsQuery> {
  constructor(
    private readonly dbContext: PrismaService,
  ) { }

  public async execute(): Promise<GetCTRsQueryResponse> {
    const totalInteractions = await this.dbContext.interaction.groupBy({
      by: 'type',
      _sum: { value: true }
    });

    const totalContentBasedClicks = totalInteractions.find(i => i.type === InteractionType.VIEW_CONTENT_BASED)?._sum.value ?? 0;
    const totalCollaborativeClicks = totalInteractions.find(i => i.type === InteractionType.VIEW_COLLABORATIVE)?._sum.value ?? 0;

    const totalImpressions = await this.dbContext.modelRequest.groupBy({
      by: 'modelType',
      _sum: { count: true }
    });


    const totalContentBasedImpressions = totalImpressions.find(mr => mr.modelType === ModelType.CONTENT_BASED)?._sum.count ?? 0;
    const totalCollaborativeImpressions = totalImpressions.find(mr => mr.modelType === ModelType.COLLABORATIVE)?._sum.count ?? 0;

    return {
      CTR_CONTENT_BASED: totalContentBasedClicks / totalContentBasedImpressions,
      CTR_COLLABORATIVE: totalCollaborativeClicks / totalCollaborativeImpressions,
      totalContentBasedClicks,
      totalContentBasedImpressions,
      totalCollaborativeClicks, 
      totalCollaborativeImpressions
    };
  }
}
