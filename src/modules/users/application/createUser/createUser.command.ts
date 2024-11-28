import { CreateUserRequestBody } from './createUser.request-body';

export class CreateUserCommand {
  constructor(public readonly body: CreateUserRequestBody) {}
}
