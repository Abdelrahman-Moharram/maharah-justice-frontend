import { apiSlice } from "../services/apiSlice";


const base_url = 'cases/'
const casesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getIndexPage: builder.query({
                query:()=>({
                    url:base_url
                }),
            }),
            getCasesList: builder.query({
                query:()=>({
                    url:base_url+"list/",
                }),
            }),

            exportCasesExcel: builder.query({
                query:()=>({
                    url:base_url+"list/?excel=true",
                    responseHandler: (response) => response.blob(), 
                }),
            }),
    }) 
})


export const {
    useGetIndexPageQuery,
    useGetCasesListQuery,
    useExportCasesExcelQuery
    
} = casesApiSlice