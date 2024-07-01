import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { CreateUser } from './create-user'
import { User } from '../../entities/user'
import { UserAlreadyExists } from './errors/UserAlreadyExists'

describe('Create User', () => {
  it('should be able to create a user', () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new CreateUser(usersRepository)
    
    expect(sut.execute({
      username: 'johndoe',
      name: 'John Doe',
      password: 'johndoe123'
    })).resolves.toBeInstanceOf(User)
  })

  it('should not be able to create a user without a unique username', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new CreateUser(usersRepository)

    await sut.execute({
      username: 'johndoe',
      name: 'John Doe',
      password: 'johndoe123'
    })
    
    expect(sut.execute({
      username: 'johndoe',
      name: 'John Doe 2.0',
      password: 'johndoe123'
    })).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})