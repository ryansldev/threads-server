import { UsersRepository } from "../../repositories/users-repository";
import { UserNotFound } from "./errors/UserNotFound";
import { UserAuthenticationFailed } from './errors/UserAuthenticationFailed'

interface AuthenticateUserRequest {
  username: string;
  password: string;
}

export class AuthenticateUser {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({
    username,
    password
  }: AuthenticateUserRequest): Promise<boolean> {
    const user = await this.usersRepository.findByUsername(username)

    if(!user) {
      throw new UserNotFound()
    }

    const isAuthenticated = await user.authenticate(password)
    if(!isAuthenticated) {
      throw new UserAuthenticationFailed()
    }

    return isAuthenticated
  }
}
