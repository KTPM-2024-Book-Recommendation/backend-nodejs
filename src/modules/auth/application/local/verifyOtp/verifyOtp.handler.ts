import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyOtpCommand } from './verifyOtp.command';
import { CacheManagerService } from 'src/modules/auth/services/cache.service';
import { BadRequestException } from '@nestjs/common';
import { LoginByLocalCommand } from '../login/loginByLocal.command';
import { ReturnToken } from 'src/modules/auth/auth.dto';
import { PrismaService } from 'src/database';

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
  constructor(
    private readonly cacheService: CacheManagerService,
    private readonly commandBus: CommandBus,
    private readonly dbContext: PrismaService
  ) {}

  public async execute(command: VerifyOtpCommand): Promise<ReturnToken> {
    const {body: { email, otp, deviceId }} = command;

    const expectedOtp = await this.cacheService.getCache<string>(`otp_${email}`);

    if (otp !== expectedOtp) {
      throw new BadRequestException('You enter the wrong otp');
    }

    const user = await this.dbContext.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        dob: true,
        country: true,
        role: {
          select: {
            type: true
          }
        }
      }
    })

    return await this.commandBus.execute<LoginByLocalCommand, ReturnToken>(new LoginByLocalCommand(user, deviceId));
  }
}
