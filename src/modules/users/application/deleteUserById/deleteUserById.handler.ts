import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserByIdCommand } from './deleteUserById.command';
import { PrismaService } from 'src/database';

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdHandler implements ICommandHandler<DeleteUserByIdCommand> {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: DeleteUserByIdCommand): Promise<void> {
    await this.deleteUserById(command.id);
  }

  private async deleteUserById(userId: string) {
    const user = await this.dbContext.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('The account does not exist.');
    }

    await this.dbContext.user.delete({ where: { id: userId } });
  }
}
