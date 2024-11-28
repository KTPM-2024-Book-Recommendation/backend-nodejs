import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PairTokens } from '../auth.dto';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signJwt(option: {
    user: LoginUserDto;
    timeString: string;
    secret: string;
  }) {
    const { user, timeString, secret } = option;

    return await this.jwtService.signAsync(
      {
        sub: user.id,
        user,
      },
      {
        secret,
        expiresIn: timeString,
      },
    );
  }

  public async getPairTokens(user: LoginUserDto): Promise<PairTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signJwt({
        user,
        timeString: "120m",
        secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
      }),
      this.signJwt({
        user,
        timeString: "7d",
        secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}