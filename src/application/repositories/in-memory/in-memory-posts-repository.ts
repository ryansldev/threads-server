import { Post } from "../../entities/post";
import { User } from "../../entities/user";
import { PostsRepository } from "../posts-repository";

export class InMemoryPostsRepository implements PostsRepository {
  public items: Post[] = []

  async create(post: Post): Promise<void> {
    this.items.push(post)
  }

  async find(postId: string): Promise<Post | undefined> {
    return this.items.find((user) => user.id === postId)
  }

  async list(user?: User): Promise<Post[]> {
    if(user) {
      const followingIds = user.following.map((user) => user.id)
      const userFollowingPosts: Post[] = []
      user.following.forEach(user => {
        user.posted.forEach(post => {
          userFollowingPosts.push(post)
        })
      });
      const anotherPosts = this.items.filter((post) => !followingIds.includes(post.authorId) && post.authorId !== user.id);
      const postsToSort = [...userFollowingPosts, ...anotherPosts]

      return postsToSort.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    }

    return this.items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async save(post: Post): Promise<void> {
    const index = this.items.indexOf(post)
    if (index !== -1) {
      this.items[index] = post
    }
  }
}