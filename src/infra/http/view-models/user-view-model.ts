import { User } from "../../../application/entities/user";

interface UserHTTP {
  id: string;
  name: string;
  username: string;
  bio?: string;
  link?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class UserViewModel {
  static toHTTP(user: User): UserHTTP {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      link: user.link,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}