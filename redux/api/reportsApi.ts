import { apiSlice } from "../services/apiSlice";


const casesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getReportFiltersDropdowns: builder.query({
            query:({base_url}:{base_url:string})=>({
                url:base_url+`reports/filters-dropdowns/`,
            }),
        }),
        
        getAllCasesReport: builder.query({
            query:({base_url, page, size, start_date, end_date, search, filter}:{base_url:string, page?:number, size?:number, start_date?:string, end_date?:string, search?:string, filter?:string})=>({
                url:base_url+`reports/`,
                params:{
                    start_date,
                    end_date,
                    page,
                    size,
                    search,
                    filter
                },
            }),
        }),
        
        exportAllCasesReport: builder.mutation({
            query:({base_url, start_date, end_date, search, filter, type, city, customer_type}:{base_url:string, start_date?:string, end_date?:string, search?:string, city:string, customer_type:string, filter?:string, type?:string})=>({
                url:base_url+`reports/`,
                params:{
                    start_date,
                    end_date,
                    search,
                    filter,
                    city,
                    customer_type,
                    export:type
                },
                responseHandler: (response) => {
                    if(type)
                       return response.blob()
                    return response.json()
                }, 
            }),
        }),
               
    }) 
})


export const {
    useExportAllCasesReportMutation,
    useGetAllCasesReportQuery,
    useGetReportFiltersDropdownsQuery
} = casesApiSlice