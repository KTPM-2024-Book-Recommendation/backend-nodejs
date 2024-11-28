import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, Matches, MaxLength, ValidateIf } from 'class-validator';
import { CreateUserRequestBody } from 'src/modules/users/application/createUser/createUser.request-body';

export class ForgetPasswordRequestBody {
  @ApiProperty({
    description: 'Email',
    maxLength: 255,
    example: 'tramnk572@gmail.com',
  })
  @Matches('^[a-zA-Z0-9_]+@[a-z]+\.(com)', '', {
    message: 'Email is not the right format',
  })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  email: string;
}
