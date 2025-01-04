import { apiSlice } from "../services/apiSlice";

const base_url = 'users/'
const lawyers_url = base_url + 'lawyers/'
const casesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getUsersList: builder.query({
            query:({page, size}:{page:number, size:number})=>({
                url:base_url+'list/',
                params:{page, size}
            }),
            providesTags:['users']
        }),
        getAddUserDropDowns: builder.query({
            query:()=>({
                url:base_url+'add/dropdowns/',
            }),
        }),
        addUser: builder.mutation({
            query:({form}:{form:FormData})=>({
                url:base_url+'add/',
                method:'POST',
                body:form,
            }),
            invalidatesTags:['users']
        }),
        editUser: builder.mutation({
            query:({id, form}:{form:FormData, id:string})=>({
                url:base_url+id+'/edit/',
                method:'PUT',
                body:form,
            }),
            invalidatesTags:['users']
        }),
        userDetails: builder.mutation({
            query:({id}:{id:string})=>({
                url:base_url+id+'/',
                method:'GET',
            }),
            // invalidatesTags:['users']
        }),
        searchUserByNameOrUserName: builder.mutation({
            query:({query, exclude}:{query:string, exclude:string})=>({
                url:base_url+'search/',
                params:{
                    query,
                    exclude
                }
            }),
            // invalidatesTags:['users']
        }),
        // ------------------------------------------------ //


        getLawyersList: builder.query({
            query:({page, size}:{page:number, size:number})=>({
                url:lawyers_url+"list/",
                params:{page, size}
            }),
            providesTags:['lawyers']
        }),
        getLawyersDropdownList: builder.query({
            query:()=>({
                url:lawyers_url+"dropdown/",
            }),
            providesTags:['lawyers']
        }),

        getLawyerDetails: builder.mutation({
            query:({id}:{id:string})=>({
                url:lawyers_url+id+'/',
                method:'GET',
            }),
        }),
        addLawyer: builder.mutation({
            query:({form}:{form:FormData})=>({
                url:lawyers_url+'add/',
                method:'POST',
                body:form,
            }),
            invalidatesTags:['lawyers']
        }),
        editLawyer: builder.mutation({
            query:({id, form}:{form:FormData, id:string})=>({
                url:lawyers_url+id+'/edit/',
                method:'PUT',
                body:form,
            }),
            invalidatesTags:['lawyers']
        }),
    }) 
})


export const {
    useGetUsersListQuery,
    useGetAddUserDropDownsQuery,
    useAddUserMutation,
    useUserDetailsMutation,
    useEditUserMutation,

    useGetLawyersListQuery,
    useSearchUserByNameOrUserNameMutation,
    useAddLawyerMutation,
    useGetLawyerDetailsMutation,
    
    useEditLawyerMutation,



} = casesApiSlice

