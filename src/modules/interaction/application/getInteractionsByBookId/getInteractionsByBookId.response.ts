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

export class GetInteractionsByBookIdQueryResponse extends PaginatedOutputDto<InteractionData> {
  @ApiProperty({
    description: "List of Interactions by news id",
    isArray: true,
  })
  data: InteractionData[];
}
