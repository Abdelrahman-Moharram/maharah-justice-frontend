import { apiSlice } from "../services/apiSlice";


const base_url = 'cases/'
const casesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getIndexPage: builder.query({
                query:()=>({
                    url:base_url,
                    params:{}
                }),
            }),
            getNavBarSearch: builder.query({
                query:({query}:{query:string})=>({
                    url:base_url+`search/`,
                    params:{query:query}
                }),
            }),
            
            getCasesList: builder.query({
                query:({page, size, filter, search, start_date, end_date}:{page:number, size:number, filter?:string|null, search:string, start_date:string, end_date:string})=>({
                    url:base_url+"list/",
                    params:{page, size, filter, search, start_date, end_date}
                }),
                providesTags:['cases']
            }),
            getCaseDetails: builder.mutation({
                query:({case_number}:{case_number:string})=>{
                    return {
                        url:base_url+case_number+"/",
                    }
                },
                invalidatesTags:['cases']
            }),
            getSessionCaseData: builder.query({
                query:({case_number}:{case_number?:string})=>({
                    url:base_url+case_number+"/session/",
                }),
            }),
            
            getCaseForm: builder.mutation({
                query:({case_number}:{case_number:string})=>({
                    url:base_url+case_number+"/form/",
                }),
            }),
            exportCasesFile: builder.mutation({
                query:({type, filter, search, start_date, end_date}:{type:string, filter?:string|null, search:string, start_date:string, end_date:string})=>({
                    url:base_url+`list/`,
                    params:{
                        export:type,
                        filter, 
                        search, 
                        start_date, 
                        end_date
                    },
                    responseHandler: (response) => response.blob(), 
                }),
            }),

            createCase: builder.mutation({
                query:({form}:{form:FormData})=>({
                    url:base_url+"add/",
                    method:'POST',
                    body:form,
                }),
                invalidatesTags:['cases']
            }),

            editCase: builder.mutation({
                query:({case_number, form}:{case_number:string, form:FormData})=>({
                    url:base_url+`${case_number}/edit/`,
                    method:'PUT',
                    body:form,
                }),
                invalidatesTags:['cases']
            }),

            deleteCase: builder.mutation({
                query:({case_number}:{case_number:string})=>({
                    url:base_url+case_number+"/delete/",
                    method:'DELETE',
                }),
                invalidatesTags:['cases']
            }),

            // ----------------------------------------------------- //

            getReportFiltersDropdowns: builder.query({
                query:()=>({
                    url:base_url+`reports/filters-dropdowns/`,
                }),
            }),
            
            getAllCasesReport: builder.query({
                query:({page, size, start_date, end_date, search,}:{ page?:number, size?:number, start_date?:string, end_date?:string, search?:string})=>({
                    url:base_url+`reports/all/`,
                    params:{
                        start_date,
                        end_date,
                        page,
                        size,
                        search,
                    },
                }),
            }),
            
            exportAllCasesReport: builder.mutation({
                query:({start_date, end_date, search,type}:{start_date?:string, end_date?:string, search?:string, type:string})=>({
                    url:base_url+`reports/all/`,
                    params:{
                        start_date,
                        end_date,
                        search,
                        export:type
                    },
                    responseHandler: (response) => response.blob(), 
                }),
            }),
            
    }) 
})


export const {
    useGetIndexPageQuery,
    useGetCasesListQuery,
    useExportCasesFileMutation,
    useCreateCaseMutation,
    useDeleteCaseMutation,
    useGetCaseFormMutation,
    useGetCaseDetailsMutation,
    useEditCaseMutation,
    useGetNavBarSearchQuery,
    
    useGetReportFiltersDropdownsQuery,
    useGetAllCasesReportQuery,
    useExportAllCasesReportMutation
} = casesApiSlice