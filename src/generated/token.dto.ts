import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  deviceId: string;
  @ApiProperty({
    required: false,
  })
  refreshToken: string;
}
