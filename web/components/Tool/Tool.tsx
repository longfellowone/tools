import { NextPage } from "next"
import { EmployeePartsFragment, ToolPartsFragment } from "../../generated/graphql"

interface Props {
  tool: ToolPartsFragment
}

const Tool: NextPage<Props> = ({ tool }) => {
  return (
    <div className="flex bg-blue-200">
      <div>{tool.tagged}</div>
      <div>{tool.brand}</div>
      <div>{tool.tool}</div>
    </div>
  )
}
export default Tool
