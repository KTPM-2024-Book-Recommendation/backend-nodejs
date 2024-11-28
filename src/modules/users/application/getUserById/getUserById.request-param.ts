import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUserByIdRequestParam {
  @ApiProperty({
    description: 'Search by id',
    example: '073bdc58-5a58-4293-a5c9-51a31643d1b8',
  })
  @IsUUID()
  id: string;
}
