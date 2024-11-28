import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsString, ValidateIf } from "class-validator";
import { PatchUserByIdAction } from "../../user.enum";

export class PatchUserByIdRequestBody {
  @ApiProperty({
    description: "Oldassword",
    example: "tramdethuongquadia",
  })
  @ValidateIf((o) => o.action === PatchUserByIdAction.CHANGE_PASSWORD)
  @IsString()
  password: string;

  @ApiProperty({
    description: "New password",
    example: "tramdethuongquadia",
  })
  @IsString()
  newPassword: string;

  @ApiProperty({
    description: "Confirmed password",
    example: "tramdethuongquadia",
  })
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  confirmedPassword: string;

  @ApiProperty({
    description: `List of values: \n  Available values: ${Object.values(PatchUserByIdAction)}`,
    example: PatchUserByIdAction.CHANGE_PASSWORD,
  })
  @IsEnum(PatchUserByIdAction)
  action: PatchUserByIdAction;
}
