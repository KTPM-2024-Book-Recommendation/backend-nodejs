import { ApiProperty } from "@nestjs/swagger";
import { InteractionType } from "@prisma/client";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class DeleteReactionByBookIdRequestParam {
  @ApiProperty({
    description: "Id of book",
    example: "073bdc58-5a58-4293-a5c9-51a31643d1b8",
  })
  @IsString()
  bookId: string;

  @ApiProperty({
    description: "Interaction Type",
    example: InteractionType.RATING,
  })
  @IsEnum(InteractionType)
  type: InteractionType;
}
