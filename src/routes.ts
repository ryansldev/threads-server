import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

async function routes(app: FastifyInstance) {
  app.get('/', async (_request: FastifyRequest, _reply: FastifyReply) => {
    return { hello: 'world' }
  })
}

export default routes
