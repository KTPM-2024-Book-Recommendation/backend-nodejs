import { UpdateMyProfileRequestBody } from './updateMyProfile.request-body';

export class UpdateMyProfileCommand {
  constructor(
    public readonly id: string,
    public readonly body: UpdateMyProfileRequestBody,
  ) {}
}
