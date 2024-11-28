import { UpsertInteractionByBookIdRequestBody } from "./upsertInteractionByBookId.request-body";

export class UpsertInteractionByBookIdCommand {
  constructor(
    public readonly userId: string,
    public readonly body: UpsertInteractionByBookIdRequestBody
  ) {}
}
