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

export class CreateUserRequestBody {
  @ApiProperty({
    description: "Name",
    maxLength: 255,
    example: "Brita",
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
  @MaxLength(255, { message: "Avatar url cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsUrl()
  avatar?: string;

  @ApiProperty({
    description: "Email",
    maxLength: 255,
    example: "brita@datahouse.com",
  })
  @Matches("^[a-zA-Z0-9_]+@[a-z]+.(com)", "", {
    message: "Email is not the right format",
  })
  @MaxLength(255, { message: "Email cannot exceed 255 characters" })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  email: string;

  @ApiProperty({
    description: "Date of birth of user",
    example: "2002-07-05",
  })
  @IsISO8601()
  dob: Date;

  @ApiProperty({
    description: "Gender of user",
    example: Gender.FEMALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({ description: "Function id of user", example: 2 })
  @IsOptional()
  @IsNumber()
  roleId?: number;

  @ApiProperty({
    description: "Password",
    example: "tramdethuongquadia",
  })
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  password: string;
}
