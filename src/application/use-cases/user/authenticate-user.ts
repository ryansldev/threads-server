import { UsersRepository } from "../../repositories/users-repository";
import { UserNotFound } from "./errors/UserNotFound";
import { UserAuthenticationFailed } from './errors/UserAuthenticationFailed'

interface AuthenticateUserRequest {
  username: string;
  password: string;
}

interface AuthenticateUserResponse {
  id: string;
}

export class AuthenticateUser {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({
    username,
    password
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByUsername(username)

    if(!user) {
      // Why not UserNotFound? Security reasons
      throw new UserAuthenticationFailed()
    }

    const isAuthenticated = await user.authenticate(password)
    if(!isAuthenticated) {
      throw new UserAuthenticationFailed()
    }

    return { id: user.id }
  }
}
