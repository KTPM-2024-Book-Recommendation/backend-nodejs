import { GetMyVotedBooksRequestQuery } from "./getMyVotedBooks.request-query";

export class GetMyVotedBooksQuery {
  constructor(public readonly userId: string, public readonly query: GetMyVotedBooksRequestQuery) { }
}
