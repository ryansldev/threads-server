import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { InMemoryPostsRepository } from "../../repositories/in-memory/in-memory-posts-repository";
import { CreateUser } from "../user/create-user";
import { CreatePost } from "./create-post";
import { FindPost } from './find-post'
import { Post } from "../../entities/post";

describe('Find Post', () => {
  it('should be able to find a post', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const postsRepository = new InMemoryPostsRepository()
    
    const createUser = new CreateUser(usersRepository)
    const user = await createUser.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: 'johndoe123'
    })
    
    const createPost = new CreatePost(usersRepository, postsRepository)
    const post = await createPost.execute({
      authorId: user.id,
      content: 'New post'
    })

    const sut = new FindPost(postsRepository)
    expect(sut.execute({
      id: post.id,
    })).resolves.toBeInstanceOf(Post)
  })
})
