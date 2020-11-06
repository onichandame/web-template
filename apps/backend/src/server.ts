import { ApolloServer } from 'apollo-server-koa'
import Koa from 'koa'
import KoaRouter from 'koa-router'

import { schema } from './resolver'

const app = new Koa()
const router = new KoaRouter()

router.get(`/api`, (ctx, next) => {
  next()
  ctx.body = `hi`
})

app.use(router.routes()).use(router.allowedMethods())

const apollo = new ApolloServer({
  schema,
  subscriptions: { path: `/api/graphql` },
})

apollo.applyMiddleware({ app, path: `/api/graphql` })

export { apollo, app }
