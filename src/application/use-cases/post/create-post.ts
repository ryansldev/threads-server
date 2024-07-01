import { Post } from '../../entities/post';
import { User } from '../../entities/user';
import { PostsRepository } from '../../repositories/posts-repository';
import { UsersRepository } from '../../repositories/users-repository';

import { AuthorNotFound } from './errors/AuthorNotFound'

interface CreatePostRequest {
  content: string;
  authorId: User['id'];
}

type CreatePostResponse = Post

export class CreatePost {
  constructor (
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository
  ) {}

  async execute({
    content,
    authorId
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const author = await this.usersRepository.find(authorId)

    if(!author) throw new AuthorNotFound()
    
    const post = new Post({
      content,
      author,
      authorId,
    })

    await this.postsRepository.create(post)

    return post
  }
}
