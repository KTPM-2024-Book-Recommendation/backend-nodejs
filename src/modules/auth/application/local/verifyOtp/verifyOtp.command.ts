import { VerifyOtpRequestBody } from "./verifyOtp.request-body";

export class VerifyOtpCommand {
  constructor(public readonly body: VerifyOtpRequestBody) {}
}
