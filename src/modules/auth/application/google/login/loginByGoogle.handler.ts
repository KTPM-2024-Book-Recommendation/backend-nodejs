import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/database";
import { LoginByGoogleQuery } from "./loginByGoogle.query";
import { LoginType, RoleType } from "@prisma/client";
import { hashString } from "src/common/utils/string";
import { v4 as uuidv4 } from "uuid";
import { AuthService } from "src/modules/auth/services";

@QueryHandler(LoginByGoogleQuery)
export class LoginByGoogleHandler implements IQueryHandler<LoginByGoogleQuery> {
  constructor(private readonly dbContext: PrismaService,  private  readonly authService: AuthService) {}

  public async execute({
    user: { name, email, avatar },
  }: LoginByGoogleQuery) {
    const role = await this.dbContext.role.findFirst({
      where: {
        type: RoleType.USER,
      },
      select: { id: true },
    });

    const user = await this.dbContext.user.upsert({
      where: {
        email,
        loginType: LoginType.GOOGLE
      },
      update: {
        email,
        name,
        avatar,
      },
      create: {
        email,
        name,
        avatar,
        loginType: LoginType.GOOGLE,
        roleId: role.id,
        dob: new Date(0,0,0),
        password: "",
      },
      select: {
        id: true,
        email: true,
        name: true,
        country: true,
        dob: true,
        role: {
          select: {
            type: true
          }
        }
    }
    });

    const pairTokens = await this.authService.getPairTokens(user);
    
    const hashedRefreshToken = hashString(pairTokens.refreshToken);

    const time = new Date();
    await this.dbContext.user.update({
      where: {id: user.id},  
      data: {
        tokens: {
          create: {
            refreshToken: hashedRefreshToken,
            deviceId: `google_${user.email}_${time}`,
          },
        },
      }
    })

    return { 
      access_token: pairTokens.accessToken,
      refresh_token: pairTokens.refreshToken
    };
  }
}
