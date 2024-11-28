import { UpdateUserByIdRequestBody } from './updateUserById.request-body';

export class UpdateUserByIdCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdateUserByIdRequestBody,
  ) {}
}
