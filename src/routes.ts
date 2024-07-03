import { FastifyInstance } from "fastify"
import { UsersController } from "./infra/http/controllers/users.controller"

const usersController = new UsersController()

async function routes(app: FastifyInstance) {
  app.post('/users', usersController.create)
  app.get('/users/:userId', usersController.find)
  app.post('/users/auth', usersController.authenticate)
}

export default routes
