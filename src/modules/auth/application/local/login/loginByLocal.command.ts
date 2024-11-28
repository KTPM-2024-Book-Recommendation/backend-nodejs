import { Response } from "express";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

export class LoginByLocalCommand {
  constructor(public readonly user: LoginUserDto, public readonly deviceId: string) {}
}
