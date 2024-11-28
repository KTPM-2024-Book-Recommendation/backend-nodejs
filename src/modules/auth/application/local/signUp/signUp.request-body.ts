import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateIf, ValidateNested } from 'class-validator';
import { CreateUserRequestBody } from 'src/modules/users/application/createUser/createUser.request-body';

export class SignUpRequestBody {
  @ApiProperty({
    description: 'information of user to create'
  })
  @ValidateIf((o) => o.user instanceof CreateUserRequestBody)
  @Type(() => CreateUserRequestBody)
  user: CreateUserRequestBody;

  @ApiProperty({
    description: 'if of device'
  })
  @IsString()
  deviceId: string;
}
