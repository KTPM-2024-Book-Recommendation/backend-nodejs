import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as dayjs from "dayjs";
import { UpdateUserByIdCommand } from "./updateUserById.command";
import { UpdateUserByIdRequestBody } from "./updateUserById.request-body";
import { PrismaService } from "src/database";

@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdHandler
  implements ICommandHandler<UpdateUserByIdCommand>
{
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: UpdateUserByIdCommand): Promise<void> {
    return this.updateUserById(command.id, command.body);
  }

  private async updateUserById(
    id: string,
    body: UpdateUserByIdRequestBody
  ): Promise<void> {
    const { name, country, dob, roleId, avatar, gender } = body;

    await this.validate({ id, roleId });

    await this.dbContext.user.update({
      where: { id },
      data: {
        name,
        country,
        gender,
        dob: dayjs(dob, { utc: true }).toDate(),
        roleId,
        avatar,
      },
    });
  }

  private async validate(option: { id: string; roleId: number }) {
    const { id, roleId } = option;

    const [existedUser, existedRole] = await Promise.all([
      this.dbContext.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      }),

      roleId
        ? this.dbContext.role.findUnique({
            where: {
              id: roleId,
            },
            select: {
              id: true,
            },
          })
        : undefined,
    ]);

    if (roleId && !existedRole?.id) {
      throw new NotFoundException("The role does not exist.");
    }

    if (!existedUser?.id) {
      throw new NotFoundException("User not found!");
    }
  }
}
