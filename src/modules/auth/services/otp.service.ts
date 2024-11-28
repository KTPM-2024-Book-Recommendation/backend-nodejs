import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator'

@Injectable()
export class OtpService {
  constructor() {}

  public async generateOtp(): Promise<string> {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false })
  }
}