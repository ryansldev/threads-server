import { expect, it, test } from 'vitest'
import { Post } from './post'
import { User } from './user'

test('create an post', () => {
  const author = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })

  const post = new Post({
    content: 'New post',
    author,
    authorId: author.id,
  })

  expect(post).toBeInstanceOf(Post)
  expect(post.id).toBeDefined()
  expect(post.content).toEqual('New post')
  expect(author.posted).length(1)
})

test('cannot create post with content exceeds 500 characters limit', () => {
  expect(() => {
    const author = new User({
      name: 'John Doe',
      username: '@johndoe',
      bio: 'John Doe',
      password: 'johndoe123',
    })
    
    new Post({
      author,
      authorId: author.id,
      content:
        `0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
        `
    })
  }).toThrow()
})

it('should be able to like a post', () => {
  const author = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })

  const user = new User({
    name: 'John Doe',
    username: '@johndoe2',
    bio: 'John Doe',
    password: 'johndoe123',
  })

  const post = new Post({
    content: 'New post',
    authorId: author.id,
    author,
  })

  post.like(user)
  expect(post.likedBy).length(1)
  expect(user.liked).length(1)
})

it('should be able to dislike a post', () => {
  const author = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })
  
  const user = new User({
    name: 'John Doe',
    username: '@johndoe2',
    bio: 'John Doe',
    password: 'johndoe123',
  })

  const post = new Post({
    content: 'New post',
    authorId: author.id,
    author,
  })

  post.like(user)
  post.dislike(user)

  expect(post.likedBy).length(0)
  expect(user.liked).length(0)
})

it('should not be able to like a post more than 1 time', () => {
  const author = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })
  
  const post = new Post({
    content: 'New post',
    authorId: author.id,
    author,
  })

  post.like(author)
  post.like(author)
  expect(post.likedBy).length(1)
  expect(author.liked).length(1)
})

it('should be able to repost a post', () => {
  const author = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })

  const user = new User({
    name: 'John Doe',
    username: '@johndoe2',
    bio: 'John Doe',
    password: 'johndoe123',
  })
  
  const post = new Post({
    content: 'New post',
    authorId: author.id,
    author,
  })

  post.repost(user)
  expect(post.repostedBy).length(1)
  expect(user.reposted).length(1)
})

it('should not be able to repost more than 1 time', () => {
  const author = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })

  const user = new User({
    name: 'John Doe',
    username: '@johndoe2',
    bio: 'John Doe',
    password: 'johndoe123',
  })
  
  const post = new Post({
    content: 'New post',
    authorId: author.id,
    author,
  })

  post.repost(user)
  post.repost(user)
  expect(post.repostedBy).length(1)
  expect(user.reposted).length(1)
})

it('should be able to comment on post', () => {
  const author = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })
  
  const post = new Post({
    content: 'New post',
    authorId: author.id,
    author,
  })

  post.comment('New comment', author)

  expect(post.relatedTo).length(1)
  expect(author.posted).length(2)
})
