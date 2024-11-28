import { SignUpRequestBody } from "./signUp.request-body";

export class SignUpCommand {
  constructor(public readonly body: SignUpRequestBody) {}
}
