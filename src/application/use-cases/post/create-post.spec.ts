import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { InMemoryPostsRepository } from '../../repositories/in-memory/in-memory-posts-repository'
import { CreateUser } from '../user/create-user'
import { CreatePost } from './create-post'
import { Post } from '../../entities/post'

describe('Create Post', () => {
  it('should be able to create a post', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()

    const createUser = new CreateUser(usersRepository)
    const user = await createUser.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: 'johndoe123'
    })
    
    const sut = new CreatePost(usersRepository, postsRepository)

    expect(sut.execute({
      authorId: user.id,
      content: 'New post'
    })).resolves.toBeInstanceOf(Post)
  })
})
