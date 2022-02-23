import { NextPage } from "next"
import { EmployeePartsFragment, useEmployeeListQuery } from "../../generated/graphql"

interface Props {
  employee: EmployeePartsFragment
}

const EmloyeeOption: NextPage<Props> = ({ employee: assignedEmployee }) => {
  const [{ data, error }] = useEmployeeListQuery()

  // return (
  //   <>
  //     <div className="bg-yellow-200">{employee.employee}</div>
  //   </>
  // )

  return (
    <div>
      <select
        id="location"
        name="location"
        className="w-44 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        defaultValue={assignedEmployee.employee}
      >
        {data?.employees.map((employee) => (
          <option key={employee.id}>{employee.employee}</option>
        ))}
      </select>
    </div>
  )
}
export default EmloyeeOption
