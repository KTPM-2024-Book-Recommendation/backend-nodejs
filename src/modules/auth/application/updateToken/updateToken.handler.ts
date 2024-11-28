import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTokenCommand } from './updateToken.command';
import { PrismaService } from 'src/database';
import { TokenType } from '../../auth.enum';
import { AuthService } from '../../services';
import { ConfigService } from '@nestjs/config';
import { hashString } from 'src/common/utils/string';
import { ReturnToken } from '../../auth.dto';

@CommandHandler(UpdateTokenCommand)
export class UpdateTokenHandler implements ICommandHandler<UpdateTokenCommand> {
  constructor(
    private readonly dbContext: PrismaService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  public async execute(command: UpdateTokenCommand): Promise<ReturnToken> {
    const {
      body: { type },
    } = command;

    switch (type) {
      case TokenType.ACCESS_TOKEN:
        return this.updateAccessToken(command);
      case TokenType.REFRESH_TOKEN:
        return this.updateRefreshToken(command);
    }
  }

  private async updateAccessToken(
    command: UpdateTokenCommand,
  ): Promise<ReturnToken> {
    const accessToken = await this.authService.signJwt({
      user: command.user,
      timeString: '30m',
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    });

    return {
      access_token: accessToken,
      refresh_token: command.body.refreshToken,
    };
  }

  private async updateRefreshToken(
    command: UpdateTokenCommand,
  ): Promise<ReturnToken> {
    const { user, body } = command;

    const pairTokens = await this.authService.getPairTokens(user);

    const hashedRefreshToken = hashString(pairTokens.refreshToken);

    await this.dbContext.token.update({
      where: {
        deviceId_userId: {
          deviceId: body.deviceId,
          userId: user.id,
        },
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    return {
      access_token: pairTokens.accessToken,
      refresh_token: pairTokens.refreshToken,
    };
  }
}
