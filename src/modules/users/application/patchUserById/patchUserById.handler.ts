import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import _ from "lodash";
import { PrismaService } from "src/database";
import { UserService } from "../../services/user.service";
import { PatchUserByIdCommand } from "./patchUserById.command";
import { hashString } from "src/common/utils/string";
import { PatchUserByIdAction } from "../../user.enum";

@CommandHandler(PatchUserByIdCommand)
export class PatchUserByIdHandler
  implements ICommandHandler<PatchUserByIdCommand>
{
  constructor(
    private readonly dbContext: PrismaService,
    private readonly userService: UserService
  ) {}

  public async execute(command: PatchUserByIdCommand): Promise<void> {
    const {
      userId,
      body: { confirmedPassword, newPassword, password, action },
    } = command;

    await this.validate({
      id: userId,
      password,
      confirmedPassword,
      newPassword,
      action,
    });

    return await this.patchUserById(userId, newPassword);
  }

  private async patchUserById(id: string, password: string): Promise<void> {
    const hashedPassword = hashString(password);

    await this.dbContext.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  }

  private async validate(options: {
    id: string;
    password: string;
    newPassword: string;
    confirmedPassword: string;
    action: PatchUserByIdAction;
  }) {
    const { id, password, newPassword, confirmedPassword, action } = options;

    if (newPassword !== confirmedPassword) {
      throw new BadRequestException(
        "Password and confirmed password do not match"
      );
    }

    const existedUser = await this.dbContext.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!existedUser?.id) {
      throw new NotFoundException("Not fount any user with this id");
    }

    if (action === PatchUserByIdAction.CHANGE_PASSWORD) {
      const isRightPassword = await this.userService.comparePassword({
        existedPassword: existedUser.password,
        inputPassword: password,
      });

      if (!isRightPassword) {
        throw new BadRequestException("You enter the wrong password");
      }

      const isLikeOldPassword = await this.userService.comparePassword({
        existedPassword: existedUser.password,
        inputPassword: newPassword,
      });

      if (isLikeOldPassword) {
        throw new BadRequestException(
          "New password is the same as old password"
        );
      }
    }
  }
}
