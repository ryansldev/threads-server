import 'dotenv/config'
import Fastify from 'fastify'
import routes from './routes'

const app = Fastify()

app.register(routes)

const port = Number(process.env.PORT)
app.listen({ port }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`HTTP Server listening on ${address}`)
})
