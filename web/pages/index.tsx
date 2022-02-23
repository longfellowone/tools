import { devtoolsExchange } from "@urql/devtools"
import { cacheExchange } from "@urql/exchange-graphcache"
import { refocusExchange } from "@urql/exchange-refocus"
import { NextPage } from "next"
import { withUrqlClient } from "next-urql"
import { dedupExchange, fetchExchange } from "urql"
import ToolList from "../components/ToolList/ToolList"

import schema from "../generated/graphql.schema"

const Index: NextPage = () => {
  return (
    <div className="text-sm">
      <ToolList />
    </div>
  )
}

export default withUrqlClient((_ssrExchange, _ctx) => {
  return {
    url: "http://192.168.0.91:8080",
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      refocusExchange(),
      cacheExchange({ schema }),
      fetchExchange,
    ],
  }
})(Index)

// const Estimates: NextPage = () => {
//   const [result] = useEstimateQuery()

//   if (!result.data) return <div>Loading...</div>

//   if (result.error) return <div>Something went wrong.</div>

//   const estimateTotal = result.data?.estimate.assemblies.reduce((total, assembly) => {
//     const assemblyTotal = assembly.items.reduce(
//       (total, item) => total + item.quantity * item.cost,
//       0
//     )

//     return total + assembly.quantity * assemblyTotal
//   }, 0)

//   return (
//     <>
//       <AddAssemblyToEstimateForm />
//       <div>Estimate Total: {estimateTotal}</div>
//       {result.data?.estimate.assemblies.map((assembly) => {
//         const assemblyTotal = assembly.items.reduce(
//           (total, item) => total + item.quantity * item.cost,
//           0
//         )

//         return (
//           <div key={assembly.id}>
//             <div>
//               {assembly.assembly} - Quantity: {assembly.quantity} - Assembly Total: {assemblyTotal}
//             </div>
//             <div>
//               {assembly.items.map((item) => (
//                 <AssemblyItemDetails key={item.id} item={item} />
//               ))}
//             </div>
//           </div>
//         )
//       })}
//     </>
//   )
// }

// const optimistic = {
//   addAssemblyToEstimate: (variables, cache, info) => {
//     console.log(variables, cache, info)

//     return {
//       __typename: 'Estimate',
//       id: '00000000-0000-0000-0000-000000000003',
//       cost: '999',
//     }
//   },
// }
