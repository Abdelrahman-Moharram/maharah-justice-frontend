import { apiSlice } from "../services/apiSlice";

const base_url = 'users/'
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
                url:base_url+'add/drop-downs/',
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
    }) 
})


export const {
    useGetUsersListQuery,
    useGetAddUserDropDownsQuery,
    useAddUserMutation
    


} = casesApiSlice

