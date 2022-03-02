import { NextPage } from "next"
import { useEmployeeListQuery, useToolListQuery } from "../generated/graphql"
import ToolListItem from "./ToolItem"

interface Props {}

const AssemblyItemDetails: NextPage<Props> = () => {
  const [{ data, error }] = useToolListQuery()
  useEmployeeListQuery()

  if (!data)
    return (
      <div className="w-full px-1 pt-2">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="mb-2 h-9 rounded-md bg-zinc-800"></div>
        ))}
      </div>
    )

  if (error) return <div>Error: something went wrong.</div>

  return (
    <div className="w-full px-1 pt-2 text-sm sm:m-auto sm:w-96">
      {data?.tools.map((tool) => (
        <ToolListItem key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
export default AssemblyItemDetails
