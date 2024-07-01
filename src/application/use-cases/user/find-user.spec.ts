import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { CreateUser } from './create-user'
import { FindUser } from './find-user'
import { User } from '../../entities/user'

describe('Find User', () => {
  it('should be able to find a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new FindUser(usersRepository)

    const user = await createUser.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: 'johndoe123'
    })

    expect(sut.execute({
      userId: user.id,
    })).resolves.toBeInstanceOf(User)
  })
})
