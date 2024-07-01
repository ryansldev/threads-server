import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { CreateUser } from './create-user'
import { AuthenticateUser } from './authenticate-user'
import { UserNotFound } from './errors/UserNotFound'

describe('Authenticate User', () => {
  it('should be able to authenticate a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new AuthenticateUser(usersRepository)

    const user = await createUser.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: 'johndoe123'
    })

    await user.hashPassword()

    expect(sut.execute({
      username: 'johndoe',
      password: 'johndoe123'
    })).resolves.toBe(true)
  })

  it('should not be able to authenticate a user that not exists', () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUser(usersRepository)

    expect(sut.execute({
      username: 'johndoe',
      password: 'johndoe123'
    })).rejects.toBeInstanceOf(UserNotFound)
  })
})
