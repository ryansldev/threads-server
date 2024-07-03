import { randomUUID } from 'crypto'
import { BadRequestError } from "../exceptions/api-errors";
import { Replace } from "../../helpers/Replace";
import { User } from "./user";

export interface PostProps {
  id: string;
  content: string;
  authorId: string;
  author: User;
  likedBy: User[];
  repostedBy: User[];
  comments: Post[];
  relatedTo?: Post;
  relatedToId?: Post["id"];
  createdAt: Date;
  updatedAt?: Date;
}

export class Post {
  private props: PostProps

  constructor (props: Replace<PostProps, { id?: string, createdAt?: Date; likedBy?: User[]; repostedBy?: User[]; relatedTo?: Post; comments?: Post[]; }>) {
    if(props.content.length > 500) {
      throw new BadRequestError("Post content exceeds 500 characters limit")
    }

    props.createdAt = props.createdAt ?? new Date()
    if(props.updatedAt && props.updatedAt < props.createdAt) {
      throw new BadRequestError("Invalid update date")
    }

    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
      likedBy: props.likedBy ?? [],
      comments: props.comments ?? [],
      repostedBy: props.repostedBy ?? [],
      createdAt: props.createdAt,
    }

    props.author.posted.push(this)
  }

  get id(): string {
    return this.props.id
  }

  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    if(content.length > 500) {
      throw new BadRequestError("Post content exceeds 500 characters limit")
    }
    
    this.props.content = content
  }

  get likedBy(): User[] | undefined {
    return this.props.likedBy
  }

  set likedBy(likedBy: User[]) {
    this.props.likedBy = likedBy
  }

  async like(user: User) {
    if(this.props.likedBy.includes(user)) return
    user.liked.push(this)
    this.props.likedBy.push(user)
  }

  async dislike(user: User) {
    const userId = user.id
    this.props.likedBy = this.props.likedBy.filter((user) => user.id !== userId)
    user.liked = user.liked.filter((likedPost) => likedPost.id !== this.props.id)
  }

  get repostedBy(): User[] {
    return this.props.repostedBy
  }

  set repostedBy(repostedBy: User[]) {
    this.props.repostedBy = repostedBy
  }

  async repost(user: User) {
    if(this.repostedBy.includes(user)) return
    this.props.repostedBy.push(user)
    user.reposted.push(this)
  }

  get relatedTo(): Post | undefined {
    return this.props.relatedTo
  }

  set relatedTo(relatedTo: Post) {
    this.props.relatedTo = relatedTo
  }

  get relatedToId(): Post["id"] | undefined {
    return this.props.relatedToId
  }

  get comments(): Post[] {
    return this.props.comments
  }

  set comments(comments: Post[]) {
    this.props.comments = comments
  }

  async comment(content: string, author: User) {
    const comment = new Post({
      content,
      author,
      authorId: author.id,
      relatedTo: this,
      relatedToId: this.id,
    })

    this.props.comments.push(comment)
  }

  get author(): User {
    return this.props.author;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}