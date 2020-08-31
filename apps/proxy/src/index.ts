import { createProxyMiddleware } from 'http-proxy-middleware'
import Express from 'express'
import debug from 'debug'
import { config } from 'dotenv'

config()

const logger = debug(`Web:Proxy`)

const port = parseInt(process.env.PORT || '') || 3000

const app = Express()

const wsProxy = createProxyMiddleware(`/graphql`, {
  target: `http://127.0.0.1:9002`,
  ws: true,
})

// backend
app.use(`/graphql`, wsProxy)
// frontend
app.use(`/`, createProxyMiddleware(`/`, { target: `http://127.0.0.1:9001` }))

const server = app.listen(port, () => {
  logger(`proxy listening on ${port}`)
})
server.on('upgrade', (req, sock, head) => {
  sock.on(`error`, (e: Error) => console.error(e))
  if (wsProxy.upgrade) wsProxy.upgrade(req, sock, head)
}) // optional: upgrade externally
