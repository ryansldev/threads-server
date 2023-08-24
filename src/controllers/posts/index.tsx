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

  async like(request: FastifyRequest, reply: FastifyReply) {
    const likeParam = z.object({ id: z.string() });

    const { id } = likeParam.parse(request.params);

    const post = await prisma.post.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        likes: true
      }
    })

    if (!post) {
      return reply.status(404).send({ message: "Post not found" })
    }

    const likeInThisPostByThisUser = post.likes.filter((like) => like.author_id === "ebc56118-6350-441b-a41d-bd9f98b0a209")
    
    if (likeInThisPostByThisUser.length > 0) {
      return reply.status(400).send({ message: "You already liked this post" })
    }

    await prisma.like.create({
      data: {
        post_id: Number(id),
        author_id: "ebc56118-6350-441b-a41d-bd9f98b0a209",
      }
    })

    return id;
  }

  async dislike(request: FastifyRequest, reply: FastifyReply) {
    const dislikeParams = z.object({ id: z.string() });

    const { id } = dislikeParams.parse(request.params);

    const post = await prisma.post.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        likes: true
      }
    })

    if (!post) {
      return reply.status(404).send({ message: "Post not found" })
    }
    
    const likeInThisPostByThisUser = post.likes.filter((like) => like.author_id === "ebc56118-6350-441b-a41d-bd9f98b0a209")
    
    if (likeInThisPostByThisUser.length === 0) {
      return reply.status(400).send({ message: "You didn't like this post" })
    }

    await prisma.like.delete({
      where: {
        author_id: "ebc56118-6350-441b-a41d-bd9f98b0a209",
        post_id: post.id,
      }
    })

    return id;
  }
}