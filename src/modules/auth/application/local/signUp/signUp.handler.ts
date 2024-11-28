import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from './signUp.command';
import { CreateUserCommand } from 'src/modules/users/application/createUser/createUser.command';
import { LoginByLocalCommand } from '../login/loginByLocal.command';
import { ReturnToken } from 'src/modules/auth/auth.dto';
import { LoginUserDto } from 'src/common/dto/loginUser.dto';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    protected readonly commandBus: CommandBus,
  ) {}

  public async execute(command: SignUpCommand): Promise<ReturnToken> {
    const {body: {deviceId, user}} = command;

    const createdUser = await this.commandBus.execute<CreateUserCommand, LoginUserDto>(new CreateUserCommand(user));

    return await this.commandBus.execute<LoginByLocalCommand, ReturnToken>(new LoginByLocalCommand(createdUser, deviceId));
  }
}
