import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Language } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from "class-validator";

export class UpdateBookByIdRequestBody {
  @ApiProperty({
    description: "Title",
    maxLength: 255,
    example: "Gone with the wind",
  })
  @IsString()
  @MaxLength(255, { message: "Title cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  title: string;

  @ApiPropertyOptional({
    description: "Description",
    example: "Outstanding classic book",
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  description: string;

  @ApiPropertyOptional({
    description: "Book Cover",
    maxLength: 255,
    example: "Paperback",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: "Book Cover cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  bookCover: string;

  @ApiPropertyOptional({
    description: "Language",
    example: Language.ENGLISH,
  })
  @IsOptional()
  @IsEnum(Language)
  language: Language;

  @ApiPropertyOptional({
    description: "Image URL",
    maxLength: 255,
  })
  @IsOptional()
  @MaxLength(255, { message: "Image url cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: "Release Date",
    example: "2002-07-05",
  })
  @IsOptional()
  @IsISO8601()
  releaseDate?: Date;

  @ApiPropertyOptional({
    description: "Publisher",
    maxLength: 255,
    example: "ABC",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: "Publisher cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  publisher: string;

  @ApiPropertyOptional({
    description: "Number Of Pages",
    example: 100,
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  numberOfPages?: number;

  @ApiPropertyOptional({
    description: "Price",
    example: 3.86,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({
    description: "Average Rating",
    example: 3.86,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  averageRating?: number;

  @ApiPropertyOptional({
    description: "Number Of Ratings",
    example: 100,
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  numberOfRatings?: number;

  @ApiPropertyOptional({
    description: "Number Of Ratings",
    example: 100,
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  numberOfReviews?: number;

  @ApiPropertyOptional({
    description: "Id of authors",
    example:
      "073bdc58-5a58-4293-a5c9-51a31643d1b8,132bdc58-5a58-4293-a5c9-51a31643d1b8",
  })
  @IsOptional()
  @IsUUID("all", { always: true })
  @Transform(({ value }) =>
    typeof value === "string" ? value.split(",") : [value]
  )
  authorIds: string[];
}
