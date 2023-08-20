import { FastifyInstance } from "fastify";

import { UserController } from "./controllers/users";

const userController = new UserController();

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", userController.create)
  app.get("/users", userController.list)
}