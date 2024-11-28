import { Body, Controller, Param, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateMyProfileCommand } from './updateMyProfile.command';
import { UpdateMyProfileRequestBody } from './updateMyProfile.request-body';
import { AuthenGuard } from 'src/common/guard/authen.guard';
import { RequestUser } from 'src/common/decorator/requestUser.decorator';

@ApiTags('Self')
@Controller({
  path: 'self/profile',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class UpdateMyProfileEndpoint {
  constructor(protected commandBus: CommandBus) {}

  @ApiOperation({ description: 'Update user by id' })
  @Put()
  public update(@RequestUser() user, @Body() body: UpdateMyProfileRequestBody): Promise<void> {
    return this.commandBus.execute<UpdateMyProfileCommand, void>(new UpdateMyProfileCommand(user.id, body));
  }
}
