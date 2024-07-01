import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { CreateUser } from './create-user'
import { UpdateUserDetails } from './update-user-details'

describe('Update user Details', () => {
  it('should be able to update user bio detail', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new UpdateUserDetails(usersRepository)
    
    const user = await createUser.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: 'johndoe123'
    })
    
    const result = await sut.execute({
      id: user.id,
      bio: 'New bio',
    })

    expect(result.bio).toBe('New bio')
  })

  it('should be able to update user link detail', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new UpdateUserDetails(usersRepository)
    
    const user = await createUser.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: 'johndoe123'
    })
    
    const result = await sut.execute({
      id: user.id,
      link: 'https://ryansldev.vercel.app'
    })

    expect(result.link).toBe('https://ryansldev.vercel.app')
  })
})
