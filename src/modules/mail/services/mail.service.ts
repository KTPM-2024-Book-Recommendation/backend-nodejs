import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { config } from "dotenv";

config();

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async sendPasswordRecoveryMail(option: {
    email: string;
    name: string;
    otp: string;
  }) {
    const { email, name, otp } = option;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_SUPPORTER,
      subject:
        "Welcome to Book Recommendation System! This is email for recover your password.",
      template: "../templates/passwordRecovery.hbs",
      context: {
        name,
        otp,
      },
    });
  }
}
