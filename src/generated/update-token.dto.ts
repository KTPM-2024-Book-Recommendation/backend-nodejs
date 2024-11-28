import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTokenDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceId?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
