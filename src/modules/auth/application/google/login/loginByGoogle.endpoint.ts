import { Body, Controller, Get, Res, UseGuards,Req  } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginByGoogleQuery } from './loginByGoogle.query';
import { AuthGuard } from '@nestjs/passport';
import { AccessToken } from 'src/modules/auth/auth.dto';
import { RequestUser } from 'src/common/decorator/requestUser.decorator';
import { Response } from 'express';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';

@ApiTags('Authentication')
@Controller({
  path: 'login',
  version: '1',
})
@UseGuards(AuthGuard('google'))
export class LoginByGoogleEndpoint {
  constructor(protected queryBus: QueryBus) { }

  @ApiOperation({ summary: 'Initiate Google Authentication' })
  @Get('google')
  public async googleAuth() {}

  @ApiOperation({ summary: 'Handle Google OAuth2 Callback' })
  @Get('google-redirect')
  public googleAuthRedirect(@Req() req: any) {
    console.log({user: req.user});
    return this.queryBus.execute<LoginByGoogleQuery, void>(new LoginByGoogleQuery(req.user));
  }
}