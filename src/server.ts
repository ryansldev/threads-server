import Fastify from 'fastify'

const app = Fastify()

app.get('/hello', () => {
  return 'Hello NLW'
})

app.listen({
  port: Number(process.env.PORT),
  host: process.env.HOST,
}).then(() => console.log('HTTP Server running!'))