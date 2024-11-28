import { ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma, InteractionType } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { IsOrderQueryParam } from "src/common/decorator/order.decorator";
import { GetInteractionsOrderByEnum } from "src/modules/interaction/interaction.enum";

export class GetInteractionsByBookIdRequestQuery {
  @ApiPropertyOptional({
    description: "Name of interaction",
    example: InteractionType.RATING,
  })
  @IsOptional()
  @IsEnum(InteractionType)
  type?: InteractionType;

  @ApiPropertyOptional({
    description: "Number of records to skip and then return the remainder",
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => value - 1)
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Number of records to return and then skip over the remainder",
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage?: number = 10;

  @ApiPropertyOptional({
    description: `Order by keyword. \n\n  Available values: ${Object.values(
      GetInteractionsOrderByEnum
    )}`,
    example: `${GetInteractionsOrderByEnum.TYPE}:${Prisma.SortOrder.asc}`,
  })
  @IsOptional()
  @IsString()
  @IsOrderQueryParam("order", GetInteractionsOrderByEnum)
  order?: string;
}
