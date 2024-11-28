import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { PaginatedOutputDto } from 'src/common/dto/pageOutput.dto';


export class GetUsersResponse {
  id: string;
  name: string | null;
  email: string;
  country: string;
  avatar: string;
  dob: Date;
  role: RoleType;
}

export class GetUsersQueryResponse extends PaginatedOutputDto<GetUsersResponse> {
  @ApiProperty({
    description: 'List of users',
    isArray: true,
  })
  data: GetUsersResponse[];
}
