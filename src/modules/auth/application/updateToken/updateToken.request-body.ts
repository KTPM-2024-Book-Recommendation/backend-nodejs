import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TokenType } from '../../auth.enum';

export class UpdateTokenRequestBody {
  @ApiProperty({
    description: 'Id of device',
    maxLength: 255,
    example: 'Environment',
  })
  @IsString()
  deviceId: string;

  @ApiProperty({
    description: 'Refresh token',
  })
  @IsString()
  refreshToken: string;

  @ApiProperty({
    description: `List of values: \n  Available values: ${Object.values(
      TokenType,
    )}`,
    example: TokenType.ACCESS_TOKEN,
  })
  @IsEnum(TokenType)
  type: TokenType;
}
