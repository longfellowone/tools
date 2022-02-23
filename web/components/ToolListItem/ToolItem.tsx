import { NextPage } from "next"
import { ToolPartsFragment } from "../../generated/graphql"
import EmloyeeOption from "../EmployeeOption/EmployeeOption"
import Tool from "../Tool/Tool"

interface Props {
  tool: ToolPartsFragment
}

const ToolListItem: NextPage<Props> = ({ tool }) => {
  return (
    <>
      <div className="mb-2 flex justify-between last:mb-0">
        <Tool tool={tool} />
        <EmloyeeOption employee={tool.assignedTo} />
      </div>
    </>
  )
}
export default ToolListItem
