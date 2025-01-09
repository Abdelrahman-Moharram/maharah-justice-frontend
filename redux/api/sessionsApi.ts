import { apiSlice } from "../services/apiSlice";


const base_url          = 'sessions/'
const consultations_url = base_url + 'consultations/'
const sessionsApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        
        // sessions list
        getSessionsList: builder.query({
            query:({page, size, search, filter}:{page:number, size:number, search?:string|null, filter:string|null})=>{                
                if (filter){
                    filter += "/"
                }else{
                    filter = ''
                }
                return {
                    url:base_url+filter,
                    params:{page, size, search},
                }
            },
            providesTags:['sessions']
        }),
        getSessionsExcel: builder.mutation({
            query:({search, type, filter}:{search?:string|null, type:string, filter:string|null;})=>{
                if (filter){
                    filter += "/"
                }else{
                    filter = ''
                }                
                return {
                    url:base_url+filter,
                    params:{search, [type]:true},
                    responseHandler: (response) => response.blob(), 

                }
            }
        }),
        // --------------

        // Daily sessions
        getDailySessionsList: builder.query({
            query:({page, size, search}:{page:number, size:number, search?:string|null})=>({
                url:base_url+"daily/",
                params:{page, size, search}
            }),
            providesTags:['sessions']
        }),
        getDailySessionsExcel: builder.mutation({
            query:({search}:{search?:string|null})=>({
                url:base_url+"daily/",
                params:{ search, excel:true}
            }),
        }),
        // --------------

        // Weekly sessions
        
        getWeeklySessionsList: builder.query({
            query:({page, size, search}:{page:number, size:number, search?:string|null})=>({
                url:base_url+"weekly/",
                params:{page, size, search}
            }),
            providesTags:['sessions']
        }),
        getWeeklySessionsExcel: builder.mutation({
            query:({search}:{search?:string|null})=>({
                url:base_url+"weekly/",
                params:{search, excel:true}
            }),
        }),
        
        // --------------

        // My Sessions
        getMySessionsList: builder.query({
            query:({page, size, search}:{page:number, size:number, search?:string|null})=>({
                url:base_url+"/mine/",
                params:{page, size, search}
            }),
            providesTags:['sessions']
        }),
        getMySessionsExcel: builder.mutation({
            query:({search}:{search?:string|null})=>({
                url:base_url+"/mine/",
                params:{search, excel:true}
            }),
        }),

        // --------------

        // Active Sessions
        getActiveSessionsList: builder.query({
            query:({page, size, search}:{page:number, size:number, search?:string|null})=>({
                url:base_url+"active/",
                params:{page, size, search}
            }),
            providesTags:['sessions']
        }),
        getActiveSessionsExcel: builder.mutation({
            query:({search}:{search?:string|null})=>({
                url:base_url+"active/",
                params:{search, excel:true}
            }),
        }),
        // --------------

        // Active Sessions

        getInActiveSessionsList: builder.query({
            query:({page, size, search}:{page:number, size:number, search?:string|null})=>({
                url:base_url+"finished/",
                params:{page, size, search}
            }),
            providesTags:['sessions']
        }),
        getInActiveSessionsExcel: builder.mutation({
            query:({search}:{search?:string|null})=>({
                url:base_url+"finished/",
                params:{search, excel:true}
            }),
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
            query:({page, size, search, filter}:{page:number, size:number, search?:string|null, filter:string|null})=>({
                url:`${consultations_url}${filter?filter+'/':''}`,
                params:{page, size, search}
            }),
            providesTags:['consultations']
        }),
        
        
        exportConsultationsList: builder.mutation({
            query:({search, filter, type}:{search?:string|null, filter:string|null, type:string})=>({
                url:`${consultations_url}${filter?filter+'/':''}`,
                params:{search, [type]:true},
                responseHandler: (response) => response.blob(), 

            }),
        }),

        getConsultationDetails: builder.query({
            query:({consult_id}:{consult_id:string})=>({
                url: consultations_url+consult_id,
            }),
            providesTags:['consultations']
        }),

        replayConsultation: builder.mutation({
            query:({consult_id, form}:{consult_id:string, form:FormData})=>({
                url: consultations_url+consult_id+"/replay/",
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

    }) 
})
    
export const {
    useGetSessionsListQuery,
    useGetSessionsExcelMutation,
    useGetActiveSessionsListQuery,
    useGetActiveSessionsExcelMutation,
    useGetDailySessionsListQuery,
    useGetDailySessionsExcelMutation,
    useGetInActiveSessionsListQuery,
    useGetInActiveSessionsExcelMutation,
    useGetMySessionsListQuery,
    useGetMySessionsExcelMutation,
    useGetWeeklySessionsListQuery,   
    useGetWeeklySessionsExcelMutation,   
    useDeleteSessionMutation,
    useAddSessionMutation,
    useGetSessionCaseInfoQuery,
    useEditSessionFormMutation,
    useEditSessionMutation,


    // Consultations
    useAddConsultationMutation,

    
    useGetConsultationsListQuery,
    useExportConsultationsListMutation,
    useGetConsultationDetailsQuery,
    useReplayConsultationMutation,
    useReadConsultationMutation




} = sessionsApiSlice    