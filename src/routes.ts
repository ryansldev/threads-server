import { FastifyInstance } from "fastify";

import { authMiddleware } from "./middlewares/auth"

import { UserController } from "./controllers/users";
import { PostController } from "./controllers/posts";
import { LikeController } from "./controllers/likes";
import { AuthController } from "./controllers/auth";

const userController = new UserController();
const postController = new PostController();
const likeController = new LikeController();
const authController = new AuthController();

export async function appRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authMiddleware)

  app.post("/users", userController.create)
  app.get("/users", userController.list)

  app.get("/posts", postController.list)
  app.post("/posts", postController.create)
  
  app.post("/posts/:id/like", likeController.create)
  app.delete("/posts/:id/like", likeController.delete)
}

export async function appUnauthenticatedRoutes(app: FastifyInstance) {
  app.post("/auth", authController.create)
}