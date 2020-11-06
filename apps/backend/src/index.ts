import { config } from 'dotenv'

import { app, apollo } from './server'

config()

const port = parseInt(process.env.PORT || '') || 3000

const httpServer = app.listen(port, () => {
  console.log(`🚀 main server ready at ${apollo.graphqlPath}`)
})
apollo.installSubscriptionHandlers(httpServer)
console.log(`🚀 subscriptions server ready at ${apollo.subscriptionsPath}`)
