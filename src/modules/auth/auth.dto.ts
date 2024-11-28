import { Prisma } from "@prisma/client";

export type PairTokens = {
    accessToken: string;
    refreshToken: string;
};

export type AccessToken = {
    access_token: string;
}

export type ReturnToken = {
    access_token: string;
    refresh_token: string;
}

