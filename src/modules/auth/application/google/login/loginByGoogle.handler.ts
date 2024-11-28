// import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
// import { PrismaService } from "src/database";
// import { LoginByGoogleQuery } from "./loginByGoogle.query";
// import { LoginType, RoleType } from "@prisma/client";
// import { RoleEnum } from "src/modules/auth/auth.enum";
// import { hashString } from "src/common/utils/string";
// import { v4 as uuidv4 } from "uuid";

// @QueryHandler(LoginByGoogleQuery)
// export class LoginByGoogleHandler implements IQueryHandler<LoginByGoogleQuery> {
//   constructor(private readonly dbContext: PrismaService) {}

//   public async execute({
//     user: { name, email, accessToken },
//   }: LoginByGoogleQuery) {
//     const role = await this.dbContext.role.findFirst({
//       where: {
//         type: RoleType.USER,
//       },
//     });

//     await this.dbContext.user.upsert({
//       where: {
//         email,
//       },
//       update: {
//         tokens: {
//           create: {
//             refreshToken: hashString(accessToken),
//             deviceId: uuidv4(),
//           },
//         },
//       },
//       create: {
//         email,
//         name,
//         loginType: LoginType.GOOGLE,
//         roleId: role.id,
//         tokens: {
//           create: {
//             refreshToken: hashString(accessToken),
//             deviceId: uuidv4(),
//           },
//         },
//       },
//     });
//   }
// }
