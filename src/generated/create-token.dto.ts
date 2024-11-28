import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  deviceId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
