import { CreateBookRequestBody } from "./createBook.request-body";

export class CreateBookCommand {
  constructor(public readonly body: CreateBookRequestBody) {}
}
