import { apiSlice } from "../services/apiSlice";

const base_url = 'utils/'
const casesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getCaseFormDropDowns: builder.query({
                query:()=>({
                    url:base_url+'case/dropdowns/',
                }),
            }),
            searchCustomerByName: builder.mutation({
                query:({query}:{query:string})=>({
                    url:base_url+'customers/search/',
                    params:{
                        query,
                    }
                }),
            })
            
    }) 
})


export const {
    useGetCaseFormDropDownsQuery,
    useSearchCustomerByNameMutation
} = casesApiSlice

