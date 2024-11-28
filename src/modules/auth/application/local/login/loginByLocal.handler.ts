import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { hashString } from 'src/common/utils/string';
import { PrismaService } from 'src/database';
import { AuthService } from 'src/modules/auth/services';
import { LoginByLocalCommand } from './loginByLocal.command';
import { ReturnToken } from 'src/modules/auth/auth.dto';

@CommandHandler(LoginByLocalCommand)
export class CreateUserHandler implements ICommandHandler<LoginByLocalCommand> {
  constructor(
    private readonly dbContext: PrismaService,
    private readonly authService: AuthService,
  ) {}

  public async execute(command: LoginByLocalCommand): Promise<ReturnToken> {
    const {user, deviceId} = command;

    const pairTokens = await this.authService.getPairTokens(user);
    
    const hashedRefreshToken = hashString(pairTokens.refreshToken);

    await this.updateToken({
      deviceId, 
      userId: user.id, 
      refreshToken: hashedRefreshToken
    });
    
    return { 
      access_token: pairTokens.accessToken,
      refresh_token: pairTokens.refreshToken
    };
  }

  private async updateToken(option: {deviceId: string, userId: string, refreshToken: string}) {
    const {deviceId, userId, refreshToken} = option;

    await this.dbContext.token.upsert({
      where: {
        deviceId_userId: {
          deviceId, 
          userId,
        },
      }, 
      create: {
        deviceId,
        userId,
        refreshToken,
      },
      update:{
        refreshToken,
      }
    })
  }
}
