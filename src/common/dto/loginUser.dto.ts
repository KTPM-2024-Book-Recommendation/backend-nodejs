import { Prisma } from "@prisma/client"

export type LoginUserDto = Prisma.UserGetPayload<{
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
}> 