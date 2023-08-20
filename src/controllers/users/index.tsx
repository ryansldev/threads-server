import { FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt"

export class UserController {
  async list() {
    return await prisma.user.findMany();
  }
  
  async create(request: FastifyRequest) {
    const createUserBody = z.object({
      name: z.string(),
      login: z.string(),
      password: z.string(),
      bio: z.string().max(255).optional(),
      instagram: z.string(),
    });
  
    const { name, login, password, bio, instagram } = createUserBody.parse(request.body)

    const encryptedPassword = await bcrypt.hash(password, 10)
  
    await prisma.user.create({
      data: {
        name,
        login,
        password: encryptedPassword,
        bio,
        instagram,
      },
    });
  }
}