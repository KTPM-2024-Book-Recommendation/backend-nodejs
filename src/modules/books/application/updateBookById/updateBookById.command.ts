import { UpdateBookByIdRequestBody } from "./updateBookById.request-body";

export class UpdateBookByIdCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdateBookByIdRequestBody
  ) {}
}
