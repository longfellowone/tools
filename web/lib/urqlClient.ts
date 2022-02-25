import { cacheExchange } from "@urql/exchange-graphcache"
import { refocusExchange } from "@urql/exchange-refocus"
import { initUrqlClient, NextUrqlClientConfig, SSRExchange } from "next-urql"
import { Client, dedupExchange, fetchExchange, ssrExchange } from "urql"
import schema from "../generated/graphql.schema"

export const urqlClientConfig: NextUrqlClientConfig = (ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
  exchanges: [
    dedupExchange,
    refocusExchange(),
    cacheExchange({ schema }),
    ssrExchange,
    fetchExchange,
  ],
})

export const urqlClient = (): [Client | null, SSRExchange] => {
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient(
    {
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
      exchanges: [dedupExchange, cacheExchange({ schema }), ssrCache, fetchExchange],
    },
    false
  )

  return [client, ssrCache]
}
