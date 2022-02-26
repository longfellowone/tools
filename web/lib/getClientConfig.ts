import { cacheExchange } from "@urql/exchange-graphcache"
import { refocusExchange } from "@urql/exchange-refocus"
import { NextUrqlClientConfig } from "next-urql"
import { dedupExchange, fetchExchange } from "urql"
import schema from "../generated/graphql.schema"

export const getClientConfig: NextUrqlClientConfig = (ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
  exchanges: [
    dedupExchange,
    refocusExchange(),
    cacheExchange({ schema }),
    ssrExchange,
    fetchExchange,
  ],
})
