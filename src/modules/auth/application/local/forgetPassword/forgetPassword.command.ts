import { ForgetPasswordRequestBody } from "./forgetPassword.request-body";

export class ForgetPasswordCommand {
  constructor(public readonly body: ForgetPasswordRequestBody) {}
}
