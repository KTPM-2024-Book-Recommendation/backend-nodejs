import { RoleType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";

export class RoleEntity {
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
  @ApiProperty({
    isArray: true,
    required: false,
  })
  users?: UserEntity[];
}
