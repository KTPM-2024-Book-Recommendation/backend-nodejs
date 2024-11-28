import { ApiProperty } from "@nestjs/swagger";
import { Gender, RoleType } from "@prisma/client";

export class GetUserByIdQueryResponse {
  @ApiProperty({
    description: "Id of user",
  })
  id: string;

  @ApiProperty({
    description: "Name of user",
  })
  name: string;

  @ApiProperty({
    description: "Email of user",
  })
  email: string;

  @ApiProperty({
    description: "Country of user",
  })
  country: string;

  @ApiProperty({
    description: "Gender of user",
  })
  gender: Gender;

  @ApiProperty({
    description: "Avatar of user",
  })
  avatar: string;

  @ApiProperty({
    description: "Date of birth of user",
  })
  dob: Date;

  @ApiProperty({
    description: "Role of user",
  })
  role: RoleType;
}
