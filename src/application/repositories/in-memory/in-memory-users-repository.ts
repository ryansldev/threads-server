import { User } from "../../entities/user";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async find(userId: string): Promise<User | undefined> {
    return this.items.find((user) => user.id === userId)
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.items.find((user) => user.username === username)
  }

  async save(user: User): Promise<void> {
    const index = this.items.indexOf(user)
    if (index !== -1) {
      this.items[index] = user
    }
  }
}