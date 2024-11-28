import { ApiProperty } from "@nestjs/swagger";
import { InteractionType } from "@prisma/client";
import { PaginatedOutputDto } from "src/common/dto/pageOutput.dto";
import { UserEntity } from "src/generated";

export class InteractionData {
  bookId: string;
  type: InteractionType;
  value: number;
  user?: UserEntity;
}

export class GetInteractionsByBookIdAndUserIdQueryResponse {
  @ApiProperty({
    description: "List of interactions by book id & user id",
    isArray: true,
  })
  data: InteractionData[];
}
