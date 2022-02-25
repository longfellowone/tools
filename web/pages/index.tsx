import { GetServerSideProps, NextPage } from "next"
import ToolList from "../components/ToolList"
import { urqlClient, urqlClientConfig } from "../lib/urqlClient"
import { EmployeeListDocument, ToolListDocument } from "../generated/graphql"
import { withUrqlClient } from "next-urql"

const Index: NextPage = () => {
  return <ToolList />
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const [client, ssrCache] = urqlClient()

//   await client?.query(EmployeeListDocument).toPromise()
//   await client?.query(ToolListDocument).toPromise()

//   return {
//     props: {
//       urqlState: ssrCache.extractData(),
//     },
//   }
// }

export default withUrqlClient(urqlClientConfig, { ssr: true })(Index)
