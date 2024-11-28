import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class UpdateBookByIdRequestParam {
  @ApiProperty({
    description: "Id of Book",
    example: "0d24551e-57f0-4702-bdd6-535d010df643",
  })
  @IsUUID()
  id: string;
}
