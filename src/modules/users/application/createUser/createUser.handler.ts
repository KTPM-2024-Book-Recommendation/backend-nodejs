import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./createUser.command";
import { CreateUserRequestBody } from "./createUser.request-body";
import { PrismaService } from "src/database";
import * as dayjs from "dayjs";
import { hashString } from "src/common/utils/string";
import { LoginUserDto } from "src/common/dto/loginUser.dto";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly dbContext: PrismaService) {}

  public async execute(command: CreateUserCommand): Promise<LoginUserDto> {
    const {
      body: { email, roleId },
    } = command;

    await this.validate({ email, roleId });

    return await this.createUser(command.body);
  }

  private async createUser(body: CreateUserRequestBody): Promise<LoginUserDto> {
    const { name, country, avatar, dob, roleId, email, password, gender } =
      body;

    const hashedPassword = hashString(password);

    const user = await this.dbContext.user.create({
      data: {
        name,
        email,
        country,
        gender,
        roleId,
        avatar,
        dob: dayjs(dob, { utc: true }).toDate(),
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        dob: true,
        gender: true,
        avatar: true,
        role: {
          select: {
            type: true,
          },
        },
      },
    });

    return user;
  }

  private async validate(option: { email: string; roleId: number }) {
    const { email, roleId } = option;

    const [existedUser, existedRole] = await Promise.all([
      this.dbContext.user.findUnique({
        where: {
          email,
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
      throw new NotFoundException("The role does not exist");
    }

    if (existedUser?.id) {
      throw new BadRequestException("This user is already in system");
    }
  }
}
