import { Post } from '../entities/post'
import { User } from '../entities/user';

export interface PostsRepository {
  create(post: Post): Promise<void>;
  find(postId: string): Promise<Post | undefined>;
  list(user?: User): Promise<Post[]>;
  save(post: Post): Promise<void>;
}
