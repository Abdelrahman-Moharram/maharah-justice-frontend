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
            }),
            
            getCitiesList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'cities/list/',
                    params:{page, size}
                }),
            }),
            getcircularList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'circulars/list/',
                    params:{page, size}
                }),
            }),
            getcourtList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'courts/list/',
                    params:{page, size}
                }),
            }),
            getCourtCircularList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'court_circulars/list/',
                    params:{page, size}
                }),
            }),
            getstateList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'states/list/',
                    params:{page, size}
                }),
            }),
            getLitigation_typeList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'litigation_types/list/',
                    params:{page, size}
                }),
            }),
            getCustomer_typeList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'customer_types/list/',
                    params:{page, size}
                }),
            }),
            getCustomerList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'customers/list/',
                    params:{page, size}
                }),
            }),

            
    }) 
})


export const {
    useGetCaseFormDropDownsQuery,
    useSearchCustomerByNameMutation,
    useSearchLawyerByNameMutation,
    useGetSessionFormDropDownsQuery,
    useGetCitiesListQuery,
    useGetcircularListQuery,
    useGetcourtListQuery,
    useGetCourtCircularListQuery,
    useGetstateListQuery,
    useGetLitigation_typeListQuery,
    useGetCustomer_typeListQuery,
    useGetCustomerListQuery,
} = casesApiSlice

