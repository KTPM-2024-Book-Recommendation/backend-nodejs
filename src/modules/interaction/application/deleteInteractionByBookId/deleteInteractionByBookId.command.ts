import { InteractionType } from "@prisma/client";

export class DeleteReactionByBookIdCommand {
  constructor(
    public readonly bookId: string,
    public readonly userId: string,
    public readonly type: InteractionType
  ) {}
}
