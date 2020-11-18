import { ApolloServer } from 'apollo-server-koa'
import Koa from 'koa'
import KoaRouter from 'koa-router'

import { schema } from './resolver'

const app = new Koa()
const router = new KoaRouter()

router.get(`/`, (ctx, next) => {
  next()
  ctx.body = `hi`
})

app.use(router.routes()).use(router.allowedMethods())

const apollo = new ApolloServer({
  playground: {
    endpoint: `/api/graphql`,
    subscriptionEndpoint: `/api/graphql`,
  },
  schema,
  subscriptions: { path: `/graphql` },
})

apollo.applyMiddleware({ app, path: `/graphql` })

export { apollo, app }
