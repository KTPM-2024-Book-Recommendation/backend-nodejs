import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { NotificationType } from "../enum/notification.enum";

export const filterString = (
    search?: string,
    mode: Prisma.QueryMode = Prisma.QueryMode.insensitive,
): Prisma.StringFilter | undefined => {
    if (search) {
        return { contains: search, mode };
    }
    return undefined;
};

export const hashString = (password: string) => {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}

export const getMessageBody = (option: {fromName: string, notificationType: NotificationType}) => {
    const { fromName, notificationType } = option;

    const mappedNotificationType = {
        COMMENT: 'has commentted on your news',
        REPLIED: 'has replied to your comment',
        REACTION_NEWS: 'has given a reaction to your news',
        REACTION_COMMENT: 'has given a reaction to your comment',
        FOLLOWED: 'has followed you',
        NEWS_VERIFY: 'has verified your news',
        NEWS_REJECT: 'has rejected your news'
    }

    return `${fromName} ${mappedNotificationType[notificationType]}`
}