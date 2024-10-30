import { apiSlice } from "../services/apiSlice";

const base_url = 'utils/'
const casesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getCaseFormDropDowns: builder.query({
                query:()=>({
                    url:base_url+'case/dropdowns/',
                }),
            }),
            getSessionFormDropDowns: builder.query({
                query:()=>({
                    url:base_url+'session/dropdowns/',
                }),
            }),
            searchCustomerByName: builder.mutation({
                query:({query}:{query:string})=>({
                    url:base_url+'customers/search/',
                    params:{
                        query,
                    }
                }),
            }),
            searchLawyerByName: builder.mutation({
                query:({query, exclude}:{query:string, exclude:string})=>({
                    url:base_url+'lawyers/search/',
                    params:{
                        query,
                        exclude
                    }
                }),
            })
            
    }) 
})


export const {
    useGetCaseFormDropDownsQuery,
    useSearchCustomerByNameMutation,
    useSearchLawyerByNameMutation,
    useGetSessionFormDropDownsQuery
} = casesApiSlice

