import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export class LikeController {
  async create(request: FastifyRequest, reply: FastifyReply) {
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

    return reply.status(200).send();
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
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

    return reply.status(200).send();
  }
}