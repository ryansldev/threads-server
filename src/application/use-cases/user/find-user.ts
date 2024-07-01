import { User } from '../../entities/user';
import { UsersRepository } from '../../repositories/users-repository';

interface FindUserRequest {
  userId: string;
}

type FindUserResponse = User | undefined

export class FindUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId
  }: FindUserRequest): Promise<FindUserResponse> {
    return await this.usersRepository.find(userId)
  }
}
