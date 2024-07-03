import { z } from 'zod';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { HttpStatusCode } from '../../../types/enums/http-status-code';
import { InMemoryUsersRepository } from '../../../application/repositories/in-memory/in-memory-users-repository'
import { UserViewModel } from '../view-models/user-view-model'

import { CreateUser } from '../../../application/use-cases/user/create-user'
import { FindUser } from '../../../application/use-cases/user/find-user'
import { AuthenticateUser } from '../../../application/use-cases/user/authenticate-user'

const usersRepository = new InMemoryUsersRepository()

export class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
      name: z.string().trim(),
      username: z.string().trim().toLowerCase(),
      password: z.string(),
    })

    const {
      name,
      username,
      password
    } = createUserSchema.parse(request.body)

    const createUser = new CreateUser(usersRepository)
    const user = await createUser.execute({
      name,
      username,
      password
    })

    return reply.status(HttpStatusCode.CREATED).send(UserViewModel.toHTTP(user))
  }

  async find(request: FastifyRequest, reply: FastifyReply) {
    const findUserSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = findUserSchema.parse(request.params)

    const findUser = new FindUser(usersRepository)
    const user = await findUser.execute({ userId })

    return reply.status(HttpStatusCode.OK).send(UserViewModel.toHTTP(user))
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      username: z.string().trim().toLowerCase(),
      password: z.string(),
    })

    const {
      username,
      password
    } = authenticateBodySchema.parse(request.body)

    const authenticateUser = new AuthenticateUser(usersRepository)

    const { id } = await authenticateUser.execute({
      username,
      password,
    })

    return reply.jwtSign({ id }).then(function (token) {
      return { token }
    })
  }
}