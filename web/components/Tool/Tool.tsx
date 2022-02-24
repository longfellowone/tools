import { NextPage } from "next"
import { EmployeePartsFragment, ToolPartsFragment } from "../../generated/graphql"

interface Props {
  tool: ToolPartsFragment
}

const Tool: NextPage<Props> = ({ tool }) => {
  return (
    <div className="flex flex-1 items-center">
      <div className="w-20">{tool.tool}</div>
      <div className="w-24 text-center">{tool.brand}</div>
      <div className="flex-1 pr-2 text-right">{tool.tagged}</div>
    </div>
  )
}
export default Tool
