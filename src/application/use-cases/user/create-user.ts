import { User } from '../../entities/user';
import { UsersRepository } from '../../repositories/users-repository'
import { UserAlreadyExists } from './errors/UserAlreadyExists'

interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
}

type CreateUserResponse = User

export class CreateUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    username,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByUsername(username)
    if(userAlreadyExists) throw new UserAlreadyExists()

    const user = new User({
      name,
      username,
      password,
    })

    await this.usersRepository.create(user)

    return user
  }
}
