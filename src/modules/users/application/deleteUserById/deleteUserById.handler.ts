import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserByIdCommand } from './deleteUserById.command';
import { PrismaService } from 'src/database';
import { ValidationService } from 'src/modules/services/validation.service';

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdHandler implements ICommandHandler<DeleteUserByIdCommand> {
  constructor(private readonly dbContext: PrismaService, private readonly validationService: ValidationService) {}

  public async execute(command: DeleteUserByIdCommand): Promise<void> {
    const userId = command.id;
    await this.validationService.validateUserExists(userId);
    await this.dbContext.user.delete({ where: { id: userId } });
  }
}
