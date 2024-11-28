import { NotFoundException } from "@nestjs/common";
import { GetNumberOfBooksBySourceQuery } from "./getNumberOfBooksBySource.query";
import { GetNumberOfBooksBySourceQueryResponse } from "./getNumberOfBooksBySource.response";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";

@QueryHandler(GetNumberOfBooksBySourceQuery)
export class GetNumberOfBooksBySourceHandler implements IQueryHandler<GetNumberOfBooksBySourceQuery> {
  constructor(private readonly dbContext: PrismaService) {}

  private async getNumberOfBooksBySource() {
    const numberOfBooksBySource = await this.dbContext.book.groupBy({
      by: 'sourceId',
      _count: true
    });

    if (!numberOfBooksBySource) {
      throw new NotFoundException("No books existed");
    }

    return numberOfBooksBySource;
  }

  public async execute(
    query: GetNumberOfBooksBySourceQuery
  ): Promise<GetNumberOfBooksBySourceQueryResponse> {
    const numberOfBooksBySource = await this.getNumberOfBooksBySource();
    return numberOfBooksBySource;
  }
}
