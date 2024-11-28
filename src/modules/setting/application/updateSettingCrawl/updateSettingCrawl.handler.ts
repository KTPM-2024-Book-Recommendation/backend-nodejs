import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateSettingCrawlCommand } from "./updateSettingCrawl.command";
import { UpdateSettingCrawlRequestBody } from "./updateSettingCrawl.request-body";
import { PrismaService } from "src/database";
import { PeriodType } from "@prisma/client";
import {
  CrawlValueDaysEnum,
  CrawlValueWeekEnum,
} from "src/common/enum/crawlTime.enum";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(UpdateSettingCrawlCommand)
export class UpdateSettingCrawlHandler
  implements ICommandHandler<UpdateSettingCrawlCommand>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: UpdateSettingCrawlCommand): Promise<void> {
    return this.updateSettingCrawl(command.body);
  }

  private async updateSettingCrawl(
    body: UpdateSettingCrawlRequestBody
  ): Promise<void> {
    const { isAutoCrawl, periodType, value, time } = body;

    if (!isAutoCrawl) {
      await this.dbContext.settingCrawl.deleteMany();
      return;
    }

    this.validate({ periodType, value });

    const settingCrawl = await this.dbContext.settingCrawl.findFirst({
      select: { id: true },
    });

    const newData = { periodType, value, time };

    if (settingCrawl?.id) {
      await this.dbContext.settingCrawl.update({
        where: { id: settingCrawl.id },
        data: newData,
      });
    } else {
      await this.dbContext.settingCrawl.create({ data: newData });
    }
  }

  private validate(option: { periodType: PeriodType; value: string }) {
    const { periodType, value } = option;

    if (periodType === PeriodType.DAYS) {
      const [monthString, day] = value.split("-");
      if (Object.values(CrawlValueDaysEnum).includes(monthString as any)) {
        const month = CrawlValueDaysEnum[monthString];
        return this.validateMonthDay({ month, day: Number(day) });
      }
    }

    if (
      periodType === PeriodType.MONTH &&
      Number(value) &&
      Number(value) > 0 &&
      Number(value) <= 31
    ) {
      return true;
    }

    if (
      periodType === PeriodType.WEEK &&
      Object.values(CrawlValueWeekEnum).includes(value)
    ) {
      return true;
    }

    throw new BadRequestException(
      "Please input valid value in accordance with period type!"
    );
  }

  private validateMonthDay(option: {
    month: CrawlValueDaysEnum;
    day: number;
  }): boolean {
    const { month, day } = option;
    const validMonth = {
      31: [
        CrawlValueDaysEnum.JANUARY,
        CrawlValueDaysEnum.MARCH,
        CrawlValueDaysEnum.MAY,
        CrawlValueDaysEnum.JULY,
        CrawlValueDaysEnum.AUGUST,
        CrawlValueDaysEnum.OCTOBER,
        CrawlValueDaysEnum.DECEMBER,
      ],
      30: [
        CrawlValueDaysEnum.APRIL,
        CrawlValueDaysEnum.JUNE,
        CrawlValueDaysEnum.SEPTEMBER,
        CrawlValueDaysEnum.NOVEMBER,
      ],
      29: [CrawlValueDaysEnum.FEBRUARY],
    };

    for (const [key, value] of Object.entries(validMonth)) {
      if (value.includes(month) && day < Number(key) && day > 0) {
        return true;
      }
    }

    throw new BadRequestException("That month does not have that day!");
  }
}
