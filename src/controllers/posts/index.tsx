import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export class PostController {
  async list() {
    return await prisma.post.findMany()
  }

  async create(request: FastifyRequest) {
    const createPostBody = z.object({
      content: z.string().max(150),
    })

    const {
      content
    } = createPostBody.parse(request.body)

    await prisma.post.create({
      data: {
        content,
        author_id: "ebc56118-6350-441b-a41d-bd9f98b0a209"
      }
    })
  }
}