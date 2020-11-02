import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  uri: `http://localhost/graphql`,
  cache: new InMemoryCache()
})
