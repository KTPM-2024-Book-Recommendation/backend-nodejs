import { PeriodType } from "@prisma/client";
import { SettingCrawlDto } from "src/generated";

export class GetSettingCrawlQueryResponse implements SettingCrawlDto {
  id: string;
  periodType: PeriodType;
  value: string;
  time: string;
}
