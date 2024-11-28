import { Prisma } from '@prisma/client';

export type GetMyVotedBooksDto = Prisma.UserGetPayload<{
  select: {
    id: true,
    avatar: true,
    email: true,
    name: true,
    dob: true,
    country: true,
    role: {
      select: {
        type: true
      }
    },
    news: {
      select: {
        id: true,
        title: true,
        content: true,
        isFake: true,
        publishDate: true,
        history: true,
        categories:{
          select: {
            category: true,
          }
        },
        reactions: {
          select: {
            name: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              },
            },
          },
        },
      }
    },
    relationshipsFrom: {
      select: {
        toNews: {
          select: {
            id: true,
            author: {
              select: {
                id: true,
                avatar: true,
                name: true,
                country: true,
                dob: true,
                email: true,
              }
            },
            title: true,
            content: true,
            isFake: true,
            publishDate: true,
            reactions: true,
            categories: true
          }
        },
        toUser: true,
        type: true,
      }
    }, 
    relationshipsTo: {
      select: {
        from: true,
        type: true,
      }
    }
  };
}>;
