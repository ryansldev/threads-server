import { FastifyInstance } from "fastify";

import { UserController } from "./controllers/users";
import { PostController } from "./controllers/posts";

const userController = new UserController();
const postController = new PostController();

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", userController.create)
  app.get("/users", userController.list)

  app.post("/posts", postController.create)
  app.post("/posts/:id/like", postController.like)
  app.delete("/posts/:id/like", postController.dislike)
}