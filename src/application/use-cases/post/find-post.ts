import { Post } from "../../entities/post"
import { PostsRepository } from "../../repositories/posts-repository"

interface FindPostRequest {
  id: string
}

type FindPostResponse = Post | undefined

export class FindPost {
  constructor(
    private postsRepository: PostsRepository
  ) {}

  async execute({ id }: FindPostRequest): Promise<FindPostResponse> {
    return await this.postsRepository.find(id)
  }
}
