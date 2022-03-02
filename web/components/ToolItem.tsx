import { NextPage } from "next"
import { ToolPartsFragment } from "../generated/graphql"
import EmloyeeOption from "./EmployeeOption"

interface Props {
  tool: ToolPartsFragment
}

const ToolListItem: NextPage<Props> = ({ tool }) => {
  return (
    <div className="mb-2 flex items-center justify-between rounded-md bg-zinc-800 pl-2">
      <div className="grid w-full grid-cols-2 items-center gap-0">
        <div>{tool.tool}</div>
        <div className="text-center">{tool.brand}</div>
      </div>
      <div className="w-28 pr-1 text-right">{tool.tagged}</div>
      <div className="w-44">
        <EmloyeeOption tool={tool} />
      </div>
    </div>
  )
}
export default ToolListItem
