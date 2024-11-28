import { InteractionType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { BookEntity } from "./book.entity";

export class InteractionEntity {
  @ApiProperty({
    required: false,
  })
  userId: string;
  @ApiProperty({
    required: false,
  })
  bookId: string;
  @ApiProperty({
    enum: InteractionType,
    required: false,
  })
  type: InteractionType;
  @ApiProperty({
    type: "number",
    format: "float",
    required: false,
  })
  value: number;
  @ApiProperty({
    required: false,
  })
  trained: boolean;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
  @ApiProperty({
    required: false,
  })
  user?: UserEntity;
  @ApiProperty({
    required: false,
  })
  book?: BookEntity;
}
