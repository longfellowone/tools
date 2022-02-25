import { NextPage } from "next"
import { ToolPartsFragment } from "../generated/graphql"

interface Props {
  tool: ToolPartsFragment
}

const Tool: NextPage<Props> = ({ tool }) => {
  return (
    <div className="flex flex-grow items-center py-3">
      <div className="w-20">{tool.tool}</div>
      <div className="w-24 text-center">{tool.brand}</div>
      <div className="flex-grow text-right">{tool.tagged}</div>
    </div>
  )
}
export default Tool
