import { Gender, LoginType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { InteractionEntity } from "./interaction.entity";
import { RoleEntity } from "./role.entity";
import { TokenEntity } from "./token.entity";

export class UserEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  name: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  country: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  avatar: string | null;
  @ApiProperty({
    required: false,
  })
  email: string;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  dob: Date;
  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender: Gender;
  @ApiProperty({
    required: false,
  })
  password: string;
  @ApiProperty({
    type: "integer",
    format: "int32",
    required: false,
  })
  roleId: number;
  @ApiProperty({
    type: "string",
    format: "date-time",
    required: false,
  })
  createdAt: Date;
  @ApiProperty({
    enum: LoginType,
    required: false,
  })
  loginType: LoginType;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  interactions?: InteractionEntity[];
  @ApiProperty({
    required: false,
  })
  role?: RoleEntity;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  tokens?: TokenEntity[];
}
