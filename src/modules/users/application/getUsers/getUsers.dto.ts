import { Prisma } from "@prisma/client";

export type GetUsersDto = Prisma.UserGetPayload<{
    select:{
        id: true,
        name: true, 
        email:true,
        country: true,
        avatar: true,
        dob: true,
        role: {
            select: {
                type: true
            }
        }
    }
}>