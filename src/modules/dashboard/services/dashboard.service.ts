import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import * as dayjs from "dayjs";
import * as _ from "lodash";
import { SourceCrawlInfo } from '../dashboard.dto';

@Injectable()
export class DashboardSersvice {
    constructor(
        private readonly dbContext: PrismaService
    ) { }

    public async getCrawledDaysBySourceId(sourceId?: number) {
        const lastCreatedAts = await this.dbContext.book.findMany(
            {
                select: {
                    createdAt: true,
                    source: true
                },
                distinct: "createdAt",
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    sourceId
                }
            }
        );

        const setCreatedAts = _.uniqBy(lastCreatedAts.map(x => (
            {
                source: x.source,
                createdAt: dayjs(x.createdAt).startOf('day').format('YYYY-MM-DD')
            }
        )), 'createdAt');

        const groupedCreatedAts = this.groupCreatedAtsBySource(setCreatedAts);

        return groupedCreatedAts;
    }

    private groupCreatedAtsBySource(setCreatedAts: SourceCrawlInfo[]) {
        let groupedCreatedAtsBySource: Record<string, any> = _.groupBy(setCreatedAts, x => x.source.name);

        for (const [sourceName, listTimesCreatedAt] of Object.entries(groupedCreatedAtsBySource)) {
            groupedCreatedAtsBySource[`${sourceName}`] = this.getPreciseTimesCreatedAt(listTimesCreatedAt);
        }

        return groupedCreatedAtsBySource as Record<string, Date[]>;
    }

    private getPreciseTimesCreatedAt(listTimesCreatedAt: SourceCrawlInfo[]) {
        const allTimesCreatedAt = listTimesCreatedAt.map(x => new Date(x.createdAt));
        const result: Date[] = [];

        for (const x of allTimesCreatedAt) {
            const lastElement = result.length ? result[result.length - 1] : null;

            const diffDate = (dayjs(x).diff(dayjs(lastElement), 'day'));

            if ((!lastElement) || (diffDate >= 3)) {
                result.push(x);
            }
        }

        return result;
    }
}
