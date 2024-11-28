import { Response } from 'express';
import { UpdateTokenRequestBody } from './updateToken.request-body';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';

export class UpdateTokenCommand {
  constructor(
    public readonly user: LoginUserDto, 
    public readonly body: UpdateTokenRequestBody, 
  ) {}
}
