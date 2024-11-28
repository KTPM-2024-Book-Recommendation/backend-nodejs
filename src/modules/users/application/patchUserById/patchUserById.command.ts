import { PatchUserByIdRequestBody } from './patchUserById.request-body';

export class PatchUserByIdCommand {
  constructor(
    public readonly userId: string,
    public readonly body: PatchUserByIdRequestBody,
  ) {}
}
