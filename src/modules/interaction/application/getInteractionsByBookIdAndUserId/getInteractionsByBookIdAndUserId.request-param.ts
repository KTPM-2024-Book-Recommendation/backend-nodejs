import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetInteractionsByBookIdAndUserIdRequestParam {
  @ApiProperty({
    description: "Search by book id",
    example: "073bdc58-5a58-4293-a5c9-51a31643d1b8",
  })
  @IsString()
  bookId: string;

  @ApiProperty({
    description: "Search by user id",
    example: "073bdc58-5a58-4293-a5c9-51a31643d1b8",
  })
  @IsString()
  userId: string;
}
