import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches, MaxLength, } from 'class-validator';

export class VerifyOtpRequestBody {
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

  @ApiProperty({
    description: 'OTP',
    maxLength: 6,
  })
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  otp: string;

  @ApiProperty({
    description: 'if of device'
  })
  @IsString()
  deviceId: string;
}
