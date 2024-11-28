import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMyProfileQuery } from './getMyProfile.query';
import { GetMyProfileQueryResponse } from './getMyProfile.response';
import { PaginatedOutputDto } from 'src/common/dto/pageOutput.dto';
import { GetMyProfileRequestParam } from './getMyProfile.request-param';
import { AuthenGuard } from 'src/common/guard/authen.guard';
import { RequestUser } from 'src/common/decorator/requestUser.decorator';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';

@ApiTags('Self')
@Controller({
  path: 'self/my-profile',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class GetMyProfileEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'Get my profile' })
  @Get()
  public get(
    @RequestUser() user: LoginUserDto
  ): Promise<PaginatedOutputDto<GetMyProfileQueryResponse>> {
    return this.queryBus.execute<
      GetMyProfileQuery, PaginatedOutputDto<GetMyProfileQueryResponse>
    >(new GetMyProfileQuery(user.id));
  }
}
