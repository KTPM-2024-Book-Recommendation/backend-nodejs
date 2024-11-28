import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/services';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<LoginUserDto> {
    const user = await this.userService.verifyUser({email, password});

    if (!user) {
      throw new UnauthorizedException(
        'You enter the wrong credentials, please input the right one.',
      );
    }

    const { password: userPassword, ...loginUserDto } = user;
    return loginUserDto;
  }
}