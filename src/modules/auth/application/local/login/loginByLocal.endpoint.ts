import { Body, Controller, Post, UseGuards  } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginByLocalCommand } from './loginByLocal.command';
import { AuthGuard } from '@nestjs/passport';
import { ReturnToken } from 'src/modules/auth/auth.dto';
import { RequestUser } from 'src/common/decorator/requestUser.decorator';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';

@ApiTags('Authentication')
@Controller({
  path: 'login/local',
  version: '1',
})
@UseGuards(AuthGuard('local'))
export class LoginByLocalEndpoint {
  constructor(protected commandBus: CommandBus) { }

  @ApiOperation({ description: 'Login by local email and password' })
  @Post()
  public login(
    @RequestUser() user: LoginUserDto, 
    @Body('deviceId') deviceId: string, 
  ) {
    return this.commandBus.execute<LoginByLocalCommand, ReturnToken>(new LoginByLocalCommand(user, deviceId));
  }
}