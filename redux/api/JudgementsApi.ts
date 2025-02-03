import { apiSlice } from "../services/apiSlice";


const base_url      = 'judgements/'
const judgementsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        
        // judgements list
        getJudgementsList: builder.query({
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
            providesTags:['judgements']
        }),

        

        addJudgement: builder.mutation({
            query:({form}:{form:FormData})=>({
                url:base_url +"add/",
                body:form,
                method:'POST'
            }),
            invalidatesTags:['judgements']

        }),
        editJudgement: builder.mutation({
            query:({number, form}:{number:string, form:FormData})=>({
                url:base_url + number + "/edit/",
                body:form,
                method:'PUT'
            }),
            invalidatesTags:['judgements']

        }),
        editJudgementForm: builder.mutation({
            query:({number}:{number:string})=>({
                url:base_url +number+"/edit-form/",
                method:'GET'
            }),
            invalidatesTags:['judgements']

        }),
        
        

        getJudgementCaseInfo: builder.query({
            query:({case_number, judgement_number}:{case_number?:string, judgement_number?:string})=>({
                url:base_url+"case-info/",
                params:{
                    judgement_number,
                    case_number
                }
            }),
        }),
        // ------------------------------------------

        deleteJudgement: builder.mutation({
            query:({id}:{id:string})=>({
                url:base_url + id + "/delete/",
                method:'DELETE'
            }),
            invalidatesTags:['judgements']

        }),


        // -----------------------------------------------------------//



        addAppeal: builder.mutation({
            query:({form, number}:{form:FormData, number:string})=>({
                url: base_url+number+"/appeals/add/",
                body:form,
                method:'POST'
            }),
            invalidatesTags:['appeals']

        }),
        editAppeal: builder.mutation({
            query:({appeal_id, number, form}:{appeal_id:string, number:string, form:FormData})=>({
                url:base_url+number+"/appeals/"+ appeal_id + "/edit/",
                body:form,
                method:'PUT'
            }),
            invalidatesTags:['appeals']

        }),
        getAppealForm: builder.query({
            query:({number}:{number:string})=>({
                url:base_url+number+"/appeals/form-data/",
                method:'GET'
            }),
            providesTags:['appeals']
        }),

        // -----------------------------------------------------------//

        getExecutionsList: builder.query({
            query:({page, size, filter, search, start_date, end_date, exec_type}:{page:number, size:number, filter?:string|null, search:string, start_date:string, end_date:string, exec_type:string})=>({
                url:base_url+"executions/",
                params:{page, size, filter, search, start_date, end_date, exec_type}
            }),
        }),
        exportExecutions: builder.mutation({
            query:({filter, search, start_date, end_date, type, exec_type}:{filter?:string|null, search:string, start_date:string, end_date:string, type:string, exec_type:string})=>({
                url:base_url+"executions/",
                params:{filter, search, start_date, end_date, export:type, exec_type},
                responseHandler: (response) => response.blob(), 
            }),
            
        }),
        getExecutionsTypesList: builder.query({
            query:()=>({
                url:base_url+"executions/types/",
            }),
        }),

    }) 
})
    
export const {
    useGetJudgementsListQuery,

    useDeleteJudgementMutation,
    useAddJudgementMutation,
    useGetJudgementCaseInfoQuery,
    useEditJudgementFormMutation,
    useEditJudgementMutation,

    useAddAppealMutation,
    useEditAppealMutation,
    useGetAppealFormQuery,    


    useGetExecutionsListQuery,
    useExportExecutionsMutation,
    useGetExecutionsTypesListQuery
} = judgementsApiSlice    