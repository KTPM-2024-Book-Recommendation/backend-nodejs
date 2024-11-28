import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class GetInteractionsByBookIdRequestParam {
  @ApiProperty({
    description: "Search by books id",
    example: "073bdc58-5a58-4293-a5c9-51a31643d1b8",
  })
  @IsString()
  bookId: string;
}
