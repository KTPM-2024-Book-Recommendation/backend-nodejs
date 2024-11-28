import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMyProfileCommand } from './updateMyProfile.command';
import { UpdateUserByIdCommand } from 'src/modules/users/application/updateUserById/updateUserById.command';

@CommandHandler(UpdateMyProfileCommand)
export class UpdateMyProfileHandler
  implements ICommandHandler<UpdateMyProfileCommand>
{
  constructor(private readonly commandBus: CommandBus) {}

  public async execute(command: UpdateMyProfileCommand): Promise<void> {
    const { id, body } = command;
    return this.commandBus.execute<UpdateUserByIdCommand, void>(
      new UpdateUserByIdCommand(id, body),
    );
  }
}
