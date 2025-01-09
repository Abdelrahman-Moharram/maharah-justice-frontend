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
            


            
            
            
            
            getCourtCircularList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'court_circulars/list/',
                    params:{page, size}
                }),
            }),
            
            
            getCustomer_typeList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'customer_types/list/',
                    params:{page, size}
                }),
            }),

            //----------------------------  customers   ----------------------------
            
            getCustomerList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'customers/list/',
                    params:{page, size}
                }),
                providesTags:['customers']
            }),


            getCustomerDropDowns: builder.query({
                query:()=>({
                    url:base_url+'customers/dropdowns/',
                }),
            }),
            getCustomerFormData: builder.mutation({
                query:({customer_id}:{customer_id:string})=>({
                    url:base_url+`customers/${customer_id}/form-data/`,
                }),
            }),
            switchCustomerStatus: builder.mutation({
                query:({customer_id}:{customer_id:string})=>({
                    url:base_url+`customers/${customer_id}/switch-status/`,
                    method:'POST'
                }),
                invalidatesTags:['customers']
            }),

            

            editCustomer:builder.mutation({
                query:({form, customer_id}:{form:FormData, customer_id:string})=>({
                    url:base_url+`customers/${customer_id}/edit/`,
                    method:'PUT',
                    body:form,
                }),
                invalidatesTags:['customers']
            }),
            addCustomer:builder.mutation({
                query:({form}:{form:FormData})=>({
                    url:base_url+`customers/add/`,
                    method:'POST',
                    body:form,
                }),
                invalidatesTags:['customers']
            }),

            //---------------------------------------------------------------------


            //----------------------------  cities   ----------------------------

            getCitiesList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'cities/list/',
                    params:{page, size}
                }),
                providesTags:['cities']
            }),
            addCity:builder.mutation({
                query:({name}:{name:string})=>({
                    url:base_url+`cities/add/`,
                    method:'POST',
                    body:{name:name},
                }),
                invalidatesTags:['cities']
            }),
            editCity:builder.mutation({
                query:({id, name}:{id:string, name:string})=>({
                    url:base_url+`cities/${id}/edit/`,
                    method:'PUT',
                    body:{name}
                }),
                invalidatesTags:['cities']
            }),
            deleteCity:builder.mutation({
                query:({id}:{id:string})=>({
                    url:base_url+`cities/${id}/delete/`,
                    method:'DELETE'
                }),
                invalidatesTags:['cities']
            }),

            //---------------------------------------------------------------------

            //----------------------------  courts   ----------------------------
            
            getCourtsList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'courts/list/',
                    params:{page, size}
                }),
                providesTags:['courts']
            }),
            addCourt:builder.mutation({
                query:({name}:{name:string})=>({
                    url:base_url+`courts/add/`,
                    method:'POST',
                    body:{name:name},
                }),
                invalidatesTags:['courts']
            }),
            editCourt:builder.mutation({
                query:({id, name}:{id:string, name:string})=>({
                    url:base_url+`courts/${id}/edit/`,
                    method:'PUT',
                    body:{name}
                }),
                invalidatesTags:['courts']
            }),
            deleteCourt:builder.mutation({
                query:({id}:{id:string})=>({
                    url:base_url+`courts/${id}/delete/`,
                    method:'DELETE'
                }),
                invalidatesTags:['courts']
            }),

            //---------------------------------------------------------------------

            //----------------------------  states   ----------------------------

            getStateList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'states/list/',
                    params:{page, size}
                }),
                providesTags:['states']
            }),

            addState:builder.mutation({
                query:({name}:{name:string})=>({
                    url:base_url+`states/add/`,
                    method:'POST',
                    body:{name:name},
                }),
                invalidatesTags:['states']
            }),
            editState:builder.mutation({
                query:({id, name}:{id:string, name:string})=>({
                    url:base_url+`states/${id}/edit/`,
                    method:'PUT',
                    body:{name}
                }),
                invalidatesTags:['states']
            }),
            deleteState:builder.mutation({
                query:({id}:{id:string})=>({
                    url:base_url+`states/${id}/delete/`,
                    method:'DELETE'
                }),
                invalidatesTags:['states']
            }),

            //---------------------------------------------------------------------
            //----------------------------  states   ----------------------------

            getLitigationTypeList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'litigation-types/list/',
                    params:{page, size}
                }),
                providesTags:['litigtion_types']
            }),

            addLitigationType:builder.mutation({
                query:({name}:{name:string})=>({
                    url:base_url+`litigation-types/add/`,
                    method:'POST',
                    body:{name:name},
                }),
                invalidatesTags:['litigtion_types']
            }),
            editLitigationType:builder.mutation({
                query:({id, name}:{id:string, name:string})=>({
                    url:base_url+`litigation-types/${id}/edit/`,
                    method:'PUT',
                    body:{name}
                }),
                invalidatesTags:['litigtion_types']
            }),
            deleteLitigationType:builder.mutation({
                query:({id}:{id:string})=>({
                    url:base_url+`litigation-types/${id}/delete/`,
                    method:'DELETE'
                }),
                invalidatesTags:['litigtion_types']
            }),

            //---------------------------------------------------------------------
            //---------------------------  circulars   ----------------------------

            getCircularsList:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:base_url+'circulars/list/',
                    params:{page, size}
                }),
                providesTags:['litigtion_types']

            }),

            addCircular:builder.mutation({
                query:({name}:{name:string})=>({
                    url:base_url+`circulars/add/`,
                    method:'POST',
                    body:{name:name},
                }),
                invalidatesTags:['litigtion_types']
            }),
            editCircular:builder.mutation({
                query:({id, name}:{id:string, name:string})=>({
                    url:base_url+`circulars/${id}/edit/`,
                    method:'PUT',
                    body:{name}
                }),
                invalidatesTags:['litigtion_types']
            }),
            deleteCircular:builder.mutation({
                query:({id}:{id:string})=>({
                    url:base_url+`circulars/${id}/delete/`,
                    method:'DELETE'
                }),
                invalidatesTags:['litigtion_types']
            }),

            //---------------------------------------------------------------------

            
    }) 
})


export const {
    useGetCaseFormDropDownsQuery,
    useSearchCustomerByNameMutation,
    useGetSessionFormDropDownsQuery,
    useGetCourtCircularListQuery,
    useGetCustomer_typeListQuery,

    
    useGetCustomerListQuery,
    useGetCustomerDropDownsQuery,
    useGetCustomerFormDataMutation,
    useEditCustomerMutation,
    useAddCustomerMutation,
    useSwitchCustomerStatusMutation,

    useGetCitiesListQuery,
    useEditCityMutation,
    useAddCityMutation,
    useDeleteCityMutation,
    
    
    useGetCourtsListQuery,
    useAddCourtMutation, 
    useEditCourtMutation,
    useDeleteCourtMutation,



    useGetStateListQuery,
    useAddStateMutation,
    useEditStateMutation,
    useDeleteStateMutation,


    useGetLitigationTypeListQuery,
    useAddLitigationTypeMutation,
    useEditLitigationTypeMutation,
    useDeleteLitigationTypeMutation,



    useGetCircularsListQuery,
    useAddCircularMutation,
    useEditCircularMutation,
    useDeleteCircularMutation


} = casesApiSlice

