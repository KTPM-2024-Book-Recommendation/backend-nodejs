import { RoleType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  id: number;
  @ApiProperty({
    enum: RoleType,
    required: false,
  })
  type: RoleType;
}
