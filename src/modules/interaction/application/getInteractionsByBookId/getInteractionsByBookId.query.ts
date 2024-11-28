import { GetInteractionsByBookIdRequestQuery } from "./getInteractionsByBookId.request-query";

export class GetInteractionsByBookIdQuery {
  constructor(
    public readonly bookId: string,
    public readonly query: GetInteractionsByBookIdRequestQuery
  ) {}
}
