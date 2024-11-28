import { Prisma } from '@prisma/client';
import * as admin from 'firebase-admin';
import { NotificationType } from '../enum/notification.enum';


export class NotificationDto {
    title?: string;
    body: string;
}

export type ReceiverDto = Prisma.UserGetPayload<{
    select: {
        id: true,
        name: true,
        tokens: {
            select :{
                deviceId: true,
            }
        }
    }
}>;