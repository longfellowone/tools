import { cacheExchange } from "@urql/exchange-graphcache"
import { GetServerSideProps, NextPage } from "next"
import { initUrqlClient, withUrqlClient } from "next-urql"
import { dedupExchange, fetchExchange, ssrExchange } from "urql"
import ToolList from "../components/ToolList"
import { urqlClientConfig } from "../lib/urqlClient"
import schema from "../generated/graphql.schema"
import { EmployeeListDocument, ToolListDocument } from "../generated/graphql"

const Index: NextPage = () => {
  return (
    <div>
      <ToolList />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient(
    {
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL as string,
      exchanges: [dedupExchange, cacheExchange({ schema }), ssrCache, fetchExchange],
    },
    false
  )

  await client?.query(EmployeeListDocument).toPromise()
  await client?.query(ToolListDocument).toPromise()

  // Use generated functions???

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  }
}

export default withUrqlClient(urqlClientConfig, { ssr: false })(Index)
