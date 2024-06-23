import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'
import { Replace } from '../../helpers/Replace'
import { BadRequestError } from '../exceptions/api-errors'
import { Post } from './post';

export interface UserProps {
  id: string;
  name: string;
  username: string;
  bio?: string;
  password: string;
  link?: string;
  followers: User[];
  following: User[];
  posted: Post[];
  liked: Post[];
  reposted: Post[];
  createdAt: Date;
  updatedAt?: Date;
}

export class User {
  private props: UserProps

  constructor(props: Replace<UserProps, { createdAt?: Date; id?: string; following?: User[]; followers?: User[]; posted?: Post[]; liked?: Post[]; reposted?: Post[] }>) { 
    props.createdAt = props.createdAt ?? new Date()
    if(props.updatedAt && props.updatedAt < props.createdAt) {
      throw new BadRequestError("Invalid update date")
    }

    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
      followers: props.followers ?? [],
      following: props.following ?? [],
      posted: props.posted ?? [],
      liked: props.liked ?? [],
      reposted: props.reposted ?? [],
      createdAt: props.createdAt,
    }
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get username(): string {
    return this.props.username
  }

  set username(username: string) {
    this.props.username = username
  }

  get bio(): string | undefined {
    return this.props.bio
  }

  set bio(bio: string) {
    this.props.bio = bio
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.props.password = hash
  }

  async authenticate(password: string): Promise<boolean> {
    const isAuthenticated = await bcrypt.compare(password, this.props.password)
    return isAuthenticated
  }

  get link(): string | undefined {
    return this.props.link
  }

  set link(link: string) {
    this.props.link = link
  }

  get followers(): User[] {
    return this.props.followers
  }

  set followers(followers: User[]) {
    this.props.followers = followers
  }

  get following(): User[] {
    return this.props.following
  }

  set following(following: User[]) {
    this.props.following = following
  }

  follow(user: User) {
    if(user.id === this.props.id) return
    this.props.following.push(user)
    user.followers.push(this)
  }
  
  unfollow(user: User) {
    if(!this.props.following.includes(user)) return
    const userId = user.id
    this.props.following = this.props.following.filter((user) => user.id !== userId)
    user.followers = user.followers.filter((user) => user.id !== this.props.id)
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

  get posted(): Post[] {
    return this.props.posted
  }

  set posted(posted: Post[]) {
    this.props.posted = posted
  }

  get liked(): Post[] {
    return this.props.liked
  }

  set liked(liked: Post[]) {
    this.props.liked = liked
  }

  get reposted(): Post[] {
    return this.props.reposted
  }

  set reposted(reposted: Post[]) {
    this.props.reposted = reposted
  }
}