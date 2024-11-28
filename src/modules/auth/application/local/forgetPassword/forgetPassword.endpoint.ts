import { Body, Controller, Post, UseGuards,  } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForgetPasswordCommand } from './forgetPassword.command';
import { ForgetPasswordRequestBody } from './forgetPassword.request-body';
import { ReturnToken } from 'src/modules/auth/auth.dto';

@ApiTags('Authentication')
@Controller({
  path: 'local/forget-password',
  version: '1',
})
export class ForgetPasswordEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Forget password' })
  @Post()
  public execute(@Body() body: ForgetPasswordRequestBody): Promise<ReturnToken> {
    return this.commandBus.execute<ForgetPasswordCommand, ReturnToken>(new ForgetPasswordCommand(body));
  }
}