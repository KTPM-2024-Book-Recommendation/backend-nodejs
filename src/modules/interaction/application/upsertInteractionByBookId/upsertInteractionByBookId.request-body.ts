import { ApiProperty } from "@nestjs/swagger";
import { InteractionType } from "@prisma/client";
import { IsEnum, IsOptional, IsPositive, IsString, IsUUID, Max } from "class-validator";

export class UpsertInteractionByBookIdRequestBody {
  @ApiProperty({
    description: "Id of Book",
    example: "0d24551e-57f0-4702-bdd6-535d010df643",
  })
  @IsString()
  bookId: string;

  @ApiProperty({
    description: `List of values: \n  Available values: ${Object.values(InteractionType)}`,
  })
  @IsEnum(InteractionType)
  type: InteractionType;

  @ApiProperty({
    description: "Value",
  })
  @IsOptional()
  @IsPositive()
  @Max(10)
  value?: number;
}
