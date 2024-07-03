import { User } from '../../entities/user';
import { UsersRepository } from '../../repositories/users-repository';

import { UserNotFound } from './errors/UserNotFound'

interface FindUserRequest {
  userId: string;
}

type FindUserResponse = User

export class FindUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId
  }: FindUserRequest): Promise<FindUserResponse> {
    const user = await this.usersRepository.find(userId)
    if(!user) {
      throw new UserNotFound()
    }

    return user
  }
}
