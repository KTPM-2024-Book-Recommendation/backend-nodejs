export class GetInteractionsByBookIdAndUserIdQuery {
  constructor(
    public readonly bookId: string,
    public readonly userId: string,
  ) {}
}
