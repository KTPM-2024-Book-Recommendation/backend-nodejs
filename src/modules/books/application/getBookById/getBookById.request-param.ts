import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetBookByIdRequestParam {
  @ApiProperty({
    description: "Search by id",
    example: "073bdc58-5a58-4293-a5c9-51a31643d1b8",
  })
  @IsString()
  id: string;
}
