import { expect, test } from 'vitest'
import { User } from './user'

test('create an user', () => {
  const user = new User({
    name: 'John Doe',
    username: '@johndoe',
    password: 'johndoe123',
  })

  expect(user).toBeInstanceOf(User)
  expect(user.id).toBeDefined()
  expect(user.name).toEqual('John Doe')
})

test('user password can be hashed', async () => {
  const user = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
    followers: [],
    following: [],
  })

  await user.hashPassword()

  expect(user.password).not.toEqual('johndoe123')
})

test('user can be authenticated', async() => {
  const user = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
    followers: [],
    following: [],
  })

  await user.hashPassword()
  const isAuthenticated = await user.authenticate('johndoe123')
  const itShouldBeFalse = await user.authenticate('johndoe12')

  expect(isAuthenticated).toBe(true)
  expect(itShouldBeFalse).toBe(false)
})

test('user can follow another user', async () => {
  const user = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })

  const user2 = new User({
    name: 'John Doe',
    username: '@johndoe2',
    bio: 'John Doe',
    password: 'johndoe123',
  })
  
  user.follow(user2)
  expect(user.following).length(1)
  expect(user2.followers).length(1)
  expect(user.following).toEqual([user2])
  expect(user2.followers).toEqual([user])
})

test('user can unfollow another user', () => {
  const user = new User({
    name: 'John Doe',
    username: '@johndoe',
    bio: 'John Doe',
    password: 'johndoe123',
  })

  const user2 = new User({
    name: 'John Doe',
    username: '@johndoe2',
    bio: 'John Doe',
    password: 'johndoe123',
  })
  
  user.follow(user2)
  user.unfollow(user2)
  expect(user.following).length(0)
  expect(user2.followers).length(0)
})
