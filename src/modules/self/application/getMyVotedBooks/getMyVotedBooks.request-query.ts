import { ApiPropertyOptional } from "@nestjs/swagger";
import { Gender, Language, Prisma } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import { IsOrderQueryParam } from "src/common/decorator/order.decorator";
import { GetBooksOrderByEnum } from "src/modules/books/application/book.enum";


export class GetMyVotedBooksRequestQuery {
  @ApiPropertyOptional({
    description: "Search by title or book cover or author name or publisher",
    example: "JK",
  })
  @IsOptional()
  @IsString()
  search?: string | null;

  @ApiPropertyOptional({
    description: "Number of records to skip and then return the remainder",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
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
      GetBooksOrderByEnum
    )}`,
    example: `${GetBooksOrderByEnum.title}:${Prisma.SortOrder.asc}`,
  })
  @IsOptional()
  @IsString()
  @IsOrderQueryParam("order", GetBooksOrderByEnum)
  order?: string;
}
