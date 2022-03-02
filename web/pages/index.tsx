import { NextPage } from "next"
import ToolList from "../components/ToolList"
import { getClientConfig } from "../lib/getClientConfig"
import { withUrqlClient } from "next-urql"

const Index: NextPage = () => {
  return <ToolList />
}

export default withUrqlClient(getClientConfig, { ssr: false })(Index)
