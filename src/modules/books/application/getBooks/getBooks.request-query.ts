import { ApiPropertyOptional } from "@nestjs/swagger";
import { Gender, Language, Prisma } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import { IsOrderQueryParam } from "src/common/decorator/order.decorator";
import { GetBooksOrderByEnum } from "../book.enum";

export class MinMaxValue {
  min?: number;
  max?: number;
}

export class GetBooksRequestQuery {
  @ApiPropertyOptional({
    description: "Search by title or book cover or author name or publisher",
    example: "JK",
  })
  @IsOptional()
  @IsString()
  search?: string | null;

  @ApiPropertyOptional({
    description: `List of values: \n  Available values: ${Object.values(
      Language
    )}`,
    type: String,
  })
  @IsOptional()
  @Transform(({ value }) => value && (value.split(",") as Language[]))
  @IsArray()
  languages?: Language[];

  @ApiPropertyOptional({
    description: `Range for price`,
    example: "3-5",
    type: String,
  })
  @IsOptional()
  @Transform(({ value }) => {
    const arr = value && value.split("-").map(Number);
    return { min: arr[0], max: arr[1] } as MinMaxValue;
  })
  @IsObject()
  price?: MinMaxValue;

  @ApiPropertyOptional({
    description: `Range for average rating`,
    example: "3-5",
    type: String,
  })
  @IsOptional()
  @Transform(({ value }) => {
    const arr = value && value.split("-").map(Number);
    return { min: arr[0], max: arr[1] } as MinMaxValue;
  })
  @IsObject()
  averageRating?: MinMaxValue;

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

  @ApiPropertyOptional({
    description: "allow the order field to be nullable",
    example: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  allowOrderFieldNull?: boolean;
}
