import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForgetPasswordCommand } from "./forgetPassword.command";
import { PrismaService } from "src/database";
import { OtpService } from "src/modules/auth/services/otp.service";
import { MailService } from "src/modules/mail/services/mail.service";
import { CacheManagerService } from "src/modules/auth/services/cache.service";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(ForgetPasswordCommand)
export class ForgetPasswordHandler
  implements ICommandHandler<ForgetPasswordCommand>
{
  constructor(
    protected readonly dbContext: PrismaService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
    private readonly cacheService: CacheManagerService
  ) {}

  public async execute(command: ForgetPasswordCommand): Promise<void> {
    const {
      body: { email },
    } = command;

    const user = await this.dbContext.user.findUnique({
      where: {
        email,
      },
      select: {
        name: true,
      },
    });

    if (!user) {
      throw new NotFoundException("This user does not exist in the system.");
    }

    const otp = await this.otpService.generateOtp();

    await this.mailService.sendPasswordRecoveryMail({
      email,
      name: user.name,
      otp,
    });

    await this.cacheService.setCache(`otp_${email}`, otp, 300000);
  }
}
