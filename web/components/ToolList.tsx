import { NextPage } from "next"
import { useToolListQuery } from "../generated/graphql"
import ToolListItem from "./ToolItem"

interface Props {}

const AssemblyItemDetails: NextPage<Props> = () => {
  const [{ data, error }] = useToolListQuery()

  // if (!data) return <div>Loading...</div>

  if (error) return <div>Error: something went wrong.</div>

  return (
    <div className="p-1 pt-2">
      {data?.tools.map((tool) => (
        <ToolListItem key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
export default AssemblyItemDetails
