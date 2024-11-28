import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";

export class TokenEntity {
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
  userId: string;
  @ApiProperty({
    required: false,
  })
  refreshToken: string;
  @ApiProperty({
    required: false,
  })
  user?: UserEntity;
}
