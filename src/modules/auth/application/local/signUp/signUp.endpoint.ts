import { Body, Controller, Post, UseGuards,  } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpCommand } from './signUp.command';
import { SignUpRequestBody } from './signUp.request-body';
import { ReturnToken } from 'src/modules/auth/auth.dto';

@ApiTags('Authentication')
@Controller({
  path: 'local/sign-up',
  version: '1',
})
export class SignUpEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Sign up' })
  @Post()
  public create(@Body() body: SignUpRequestBody): Promise<ReturnToken> {
    return this.commandBus.execute<SignUpCommand, ReturnToken>(new SignUpCommand(body));
  }
}
