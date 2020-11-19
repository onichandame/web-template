import { useState, useEffect } from 'react'
import ws from 'isomorphic-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  split,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  HttpLink
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import fetch from 'isomorphic-fetch'

const relativeGraphqlPath = `/api/graphql`

export const useApolloClient = () => {
  const [client, setClient] = useState<ApolloClient<any>>(null)
  const [httpLink, setHttpLink] = useState<HttpLink>(null)
  const [wsLink, setWsLink] = useState<WebSocketLink>(null)
  const [link, setLink] = useState<ApolloLink>(null)
  useEffect(() => {
    setHttpLink(new HttpLink({ uri: relativeGraphqlPath, fetch }))
    setWsLink(
      new WebSocketLink({
        uri:
          (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
          window.location.host +
          relativeGraphqlPath,
        options: { reconnect: true },
        webSocketImpl: ws
      })
    )
    setLink(
      split(
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
    )
    setClient(
      new ApolloClient({
        link,
        cache: new InMemoryCache()
      })
    )
  }, [])

  return client
}
