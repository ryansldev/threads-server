import { User } from '../entities/user'

export interface UsersRepository {
  create(user: User): Promise<void>
  find(userId: string): Promise<User | undefined>
  findByUsername(username: string): Promise<User | undefined>
  save(user: User): Promise<void>
}
