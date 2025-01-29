import { apiSlice } from "../services/apiSlice";


const base_url          = 'sessions/'
const consultations_url = base_url + 'consultations/'
const sessionsApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        
        // sessions list
        getSessionsList: builder.query({
            query:({page, size, search, filter, start_date, end_date}:{page:number, size:number, search?:string|null, filter:string|null, start_date:string, end_date:string})=>{                
                return {
                    url:base_url,
                    params:{page, size, search, filter, start_date, end_date},
                }
            },
            providesTags:['sessions']
        }),
        getSessionsExcel: builder.mutation({
            query:({search, type, filter}:{search?:string|null, type:string, filter:string|null;})=>{
                               
                return {
                    url:base_url,
                    params:{search, export:type, filter},
                    responseHandler: (response) => response.blob(), 
                }
            }
        }),
        

        
        // -------------- add & update --------------

        

        addSession: builder.mutation({
            query:({form}:{form:FormData})=>({
                url:base_url +"add/",
                body:form,
                method:'POST'
            }),
            invalidatesTags:['sessions']

        }),
        editSession: builder.mutation({
            query:({id, form}:{id:string, form:FormData})=>({
                url:base_url + id + "/edit/",
                body:form,
                method:'PUT'
            }),
            invalidatesTags:['sessions']

        }),
        editSessionForm: builder.mutation({
            query:({id}:{id:string})=>({
                url:base_url +id+"/form/",
                method:'GET'
            }),
            invalidatesTags:['sessions']

        }),

        getSessionCaseInfo: builder.query({
            query:({case_number, session_id}:{case_number?:string, session_id?:string})=>({
                url:base_url+"case-info/",
                params:{
                    session_id,
                    case_number
                }
            }),
        }),
        // ------------------------------------------

        deleteSession: builder.mutation({
            query:({id}:{id:string})=>({
                url:base_url + id + "/delete/",
                method:'DELETE'
            }),
            invalidatesTags:['sessions']

        }),


        // ------------------------------------------ //


        getConsultationsList: builder.query({
            query:({page, size, search, filter, start_date, end_date}:{page:number, size:number, search?:string|null, filter:string|null, start_date:string, end_date:string})=>({
                url:`${consultations_url}${filter?filter+'/':''}`,
                params:{page, size, search, start_date, end_date}
            }),
            providesTags:['consultations']
        }),

        getConsultationsTypes: builder.query({
            query:()=>({
                url:consultations_url+'types/',
            }),
        }),
        
        
        exportConsultationsList: builder.mutation({
            query:({search, filter, start_date, end_date, type}:{search?:string|null, filter:string|null, start_date:string, end_date:string, type:string})=>({
                url:`${consultations_url}${filter?filter+'/':''}`,
                params:{search, start_date, end_date, export:type},
                responseHandler: (response) => response.blob(), 

            }),
        }),

        getConsultationDetails: builder.query({
            query:({consult_id}:{consult_id:string})=>({
                url: consultations_url+consult_id,
            }),
            providesTags:['consultations']
        }),

        replyConsultation: builder.mutation({
            query:({consult_id, form}:{consult_id:string, form:FormData})=>({
                url: consultations_url+consult_id+"/reply/",
                body:form,
                method:'POST'
            }),
            invalidatesTags:['consultations']
        }),
        addConsultation: builder.mutation({
            query:({session_id, form}:{session_id:string, form:FormData})=>({
                url: base_url+session_id+"/consultations/add/",
                body:form,
                method:'POST'
            }),
            invalidatesTags:['consultations']
        }),
        readConsultation: builder.mutation({
            query:({consult_id}:{consult_id:string})=>({
                url: consultations_url+consult_id+"/read/",
                method:'GET'
            }),
            invalidatesTags:['consultations']
        }),

        acceptRejectConsultation: builder.mutation({
            query:({consult_id, form}:{consult_id:string, form:FormData})=>({
                url: consultations_url+consult_id+"/manage/",
                body:form,
                method:'POST'
            }),
            invalidatesTags:['consultations']
        }),



        // --------------------------- Reports ------------------------ //


        getAllSessionsReport: builder.query({
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
        
        exportAllSessionsReport: builder.mutation({
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

        // --------------------------- Reports ------------------------ //


    }) 
})
    
export const {
    useGetSessionsListQuery,
    useGetSessionsExcelMutation,  
    useDeleteSessionMutation,
    useAddSessionMutation,
    useGetSessionCaseInfoQuery,
    useEditSessionFormMutation,
    useEditSessionMutation,


    // Consultations
    useAddConsultationMutation,

    useGetConsultationsTypesQuery,
    useGetConsultationsListQuery,
    useExportConsultationsListMutation,
    useGetConsultationDetailsQuery,
    useReplyConsultationMutation,
    useReadConsultationMutation,
    useAcceptRejectConsultationMutation,


    useGetAllSessionsReportQuery,
    useExportAllSessionsReportMutation




} = sessionsApiSlice    