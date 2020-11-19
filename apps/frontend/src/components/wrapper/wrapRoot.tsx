import React, { FC } from 'react'
import { WrapRootElementBrowserArgs } from 'gatsby'
import { ApolloProvider } from '@apollo/client'

import { useApolloClient } from './apolloClient'

export const wrapRootElement: FC<WrapRootElementBrowserArgs> = ({
  element
}) => {
  const client = useApolloClient()
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
