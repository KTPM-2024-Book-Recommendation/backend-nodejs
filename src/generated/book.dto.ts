import { Language } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  title: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  preprocessedDescription: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  bookCover: string | null;
  @ApiProperty({
    enum: Language,
    required: false,
    nullable: true,
  })
  language: Language | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  imageUrl: string | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
    nullable: true,
  })
  releaseDate: Date | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  publisher: string | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
    nullable: true,
  })
  numberOfPages: number | null;
  @ApiProperty({
    type: "number",
    format: "float",
    required: false,
    nullable: true,
  })
  price: number | null;
  @ApiProperty({
    type: "number",
    format: "float",
    required: false,
    nullable: true,
  })
  averageRating: number | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
    nullable: true,
  })
  numberOfRatings: number | null;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
    nullable: true,
  })
  numberOfReviews: number | null;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  categories: string | null;
}
