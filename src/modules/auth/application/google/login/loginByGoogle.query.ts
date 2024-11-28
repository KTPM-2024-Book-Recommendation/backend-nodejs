import { UserLoginGoogleDto } from "./loginByGoogle.dto";

export class LoginByGoogleQuery {
  constructor(public readonly user: UserLoginGoogleDto) {}
}
