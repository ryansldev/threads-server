import 'dotenv/config'
import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import routes from './routes'

const app = Fastify()

app.register(jwt, {
  secret: process.env.JWT_TOKEN!,
})

app.addHook('onRequest', async (request, reply) => {
  try {
    if(request.url === '/users' && request.method === 'POST') return
    if(request.url === '/users/auth' && request.method === 'POST') return
    
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

app.register(routes)

const port = Number(process.env.PORT)
app.listen({ port }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`HTTP Server listening on ${address}`)
})
