import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "@prisma/client";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from "class-validator";

export class UpdateUserByIdRequestBody {
  @ApiProperty({
    description: "Name",
    maxLength: 255,
    example: "Jasmine",
  })
  @Matches("^[A-Za-z ]+$", "", {
    message: "Name must be alphabetical",
  })
  @MaxLength(255, { message: "Name cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name: string;

  @ApiPropertyOptional({
    description: "Country",
    maxLength: 255,
    example: "Vietnam",
  })
  @Matches("^[a-zA-Z\\s]+$", "", {
    message: "Country must be alphabetical",
  })
  @IsOptional()
  @MaxLength(255, { message: "Country cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  country?: string;

  @ApiPropertyOptional({
    description: "Avatar",
    maxLength: 255,
  })
  @IsOptional()
  @MaxLength(255, { message: "Avatar cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsUrl()
  avatar?: string;

  @ApiPropertyOptional({
    description: "Date of birth of user",
    example: "2002-07-05",
  })
  @IsOptional()
  @IsISO8601()
  dob?: Date;

  @ApiPropertyOptional({
    description: "Gender of user",
    example: Gender.FEMALE,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({ description: "Function id of user", example: 1 })
  @IsOptional()
  @IsNumber()
  roleId?: number;
}
