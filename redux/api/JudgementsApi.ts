import { apiSlice } from "../services/apiSlice";


const base_url = 'judgements/'
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

        })

    }) 
})
    
export const {
    useGetJudgementsListQuery,

    useDeleteJudgementMutation,
    useAddJudgementMutation,
    useGetJudgementCaseInfoQuery,
    useEditJudgementFormMutation,
    useEditJudgementMutation
} = judgementsApiSlice    