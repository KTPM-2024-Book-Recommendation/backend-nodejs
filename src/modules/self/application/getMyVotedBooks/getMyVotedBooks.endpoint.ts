import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMyVotedBooksQuery } from './getMyVotedBooks.query';
import { GetMyVotedBooksQueryResponse } from './getMyVotedBooks.response';
import { PaginatedOutputDto } from 'src/common/dto/pageOutput.dto';
import { GetMyVotedBooksRequestParam } from './getMyVotedBooks.request-param';
import { AuthenGuard } from 'src/common/guard/authen.guard';
import { RequestUser } from 'src/common/decorator/requestUser.decorator';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';
import { GetMyVotedBooksRequestQuery } from './getMyVotedBooks.request-query';

@ApiTags('Self')
@Controller({
  path: 'self/my-voted-books',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(AuthenGuard)
export class GetMyVotedBooksEndpoint {
  constructor(protected queryBus: QueryBus) {}

  @ApiOperation({ description: 'Get my voted books' })
  @Get()
  public get(
    @RequestUser() user: LoginUserDto,
    @Query() query: GetMyVotedBooksRequestQuery,
  ): Promise<PaginatedOutputDto<GetMyVotedBooksQueryResponse>> {
    return this.queryBus.execute<
      GetMyVotedBooksQuery, PaginatedOutputDto<GetMyVotedBooksQueryResponse>
    >(new GetMyVotedBooksQuery(user.id, query));
  }
}
