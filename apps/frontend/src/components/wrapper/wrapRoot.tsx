import React, { FC } from 'react'
import ws from 'isomorphic-ws'
import { WrapRootElementBrowserArgs } from 'gatsby'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  split,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import fetch from 'isomorphic-fetch'

const httpLink = new HttpLink({ uri: `/api/graphql`, fetch })
const wsLink = new WebSocketLink({
  uri: `ws://work.onichandame.com:3000/api/graphql`,
  options: { reconnect: true },
  webSocketImpl: ws
})
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

export const wrapRootElement: FC<WrapRootElementBrowserArgs> = ({
  element
}) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
