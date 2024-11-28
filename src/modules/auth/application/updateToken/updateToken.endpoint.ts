import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateTokenCommand } from './updateToken.command';
import { UpdateTokenRequestBody } from './updateToken.request-body';
import { RequestUser } from 'src/common/decorator/requestUser.decorator';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';
import { RefreshTokenGuard } from 'src/common/guard/refreshToken.guard';

@ApiTags('Authentication')
@Controller({
  path: 'refresh',
  version: '1',
})
@UseGuards(RefreshTokenGuard)
export class UpdateTokenEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Refresh Token' })
  @Put()
  public create(
    @Body() body: UpdateTokenRequestBody,
    @RequestUser() user: LoginUserDto,
  ): Promise<void> {
    return this.commandBus.execute<UpdateTokenCommand, void>(
      new UpdateTokenCommand(user, body),
    );
  }
}
