import { NextPage } from "next"
import { SubmitHandler, useForm } from "react-hook-form"
import {
  ToolPartsFragment,
  useAssignToolMutation,
  useEmployeeListQuery,
} from "../../generated/graphql"

interface Props {
  tool: ToolPartsFragment
}

interface FormValues {
  employeeId: string
}

const EmloyeeOption: NextPage<Props> = ({ tool }) => {
  const { register, handleSubmit } = useForm<FormValues>()

  const [{ data }] = useEmployeeListQuery()
  const [mutateResult, mutate] = useAssignToolMutation()

  if (mutateResult.error) return <div className="w-28 py-3 text-center text-red-500">Error</div>
  if (mutateResult.fetching) return <div className="w-28 py-3 pl-4">Saving...</div>

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    mutate({ input: { toolId: tool.id, employeeId: form.employeeId } })
  }

  return (
    <form onChange={handleSubmit(onSubmit)}>
      <select
        {...register("employeeId")}
        id="employeeId"
        name="employeeId"
        className="w-28 rounded-md border-none bg-zinc-800 py-3 pl-4
                   focus:outline-none focus:ring focus:ring-blue-500"
        value={tool.assignedTo.id}
      >
        {data?.employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.firstName}
          </option>
        ))}
      </select>
    </form>
  )
}

export default EmloyeeOption
