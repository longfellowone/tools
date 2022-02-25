import { NextPage } from "next"
import { ToolPartsFragment } from "../generated/graphql"
import EmloyeeOption from "./EmployeeOption"
import Tool from "./Tool"

interface Props {
  tool: ToolPartsFragment
}

const ToolListItem: NextPage<Props> = ({ tool }) => {
  return (
    <>
      <div className="mb-2 flex justify-between rounded-md bg-zinc-800 pl-2 last:mb-0">
        <Tool tool={tool} />
        <EmloyeeOption tool={tool} />
      </div>
    </>
  )
}
export default ToolListItem
