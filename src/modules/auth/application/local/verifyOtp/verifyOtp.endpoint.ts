import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyOtpCommand } from './verifyOtp.command';
import { VerifyOtpRequestBody } from './verifyOtp.request-body';
import { ReturnToken } from 'src/modules/auth/auth.dto';

@ApiTags('Authentication')
@Controller({
  path: 'local/verify-otp',
  version: '1',
})
export class VerifyOtpEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({
    description: 'Verify otp in the email for passwofd recovery',
  })
  @Post()
  public execute(@Body() body: VerifyOtpRequestBody): Promise<ReturnToken> {
    return this.commandBus.execute<VerifyOtpCommand, ReturnToken>(
      new VerifyOtpCommand(body),
    );
  }
}
