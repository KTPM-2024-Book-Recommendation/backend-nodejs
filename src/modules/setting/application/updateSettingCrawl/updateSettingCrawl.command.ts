import { UpdateSettingCrawlRequestBody } from "./updateSettingCrawl.request-body";

export class UpdateSettingCrawlCommand {
  constructor(public readonly body: UpdateSettingCrawlRequestBody) {}
}
