import { NewsReactionDto } from "src/common/dto/newsReaction.dto";

export class UserDto {
  id: string;
  name: string;
  avatar: string;
}

export class Follow {
  amount: number;
  users: UserDto[];
}

export class FavouriteNews {
  id: string;
  author: {
    id: string;
    avatar: string;
    name: string;
    country: string;
    dob: Date;
    email: string;
  };
  title: string;
  content: string;
  thumbnail: string;
  isFake: boolean;
  publishDate: Date;
  reactions: NewsReactionDto[];
}
