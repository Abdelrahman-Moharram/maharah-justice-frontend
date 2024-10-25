import { apiSlice } from "../services/apiSlice";


const base_url = 'sessions/'
const sessionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        
        // sessions list
        getSessionsList: builder.query({
            query:({page, size, search}:{page:number, size:number, search?:string|null})=>({
                url:base_url,
                params:{page, size, search}
            }),
            providesTags:['sessions']
        }),
        getSessionsExcel: builder.mutation({
            query:({search}:{search?:string|null})=>({
                url:base_url,
                params:{search, excel:true}
            }),
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
                url:base_url+"in-active/",
                params:{page, size, search}
            }),
            providesTags:['sessions']
        }),
        getInActiveSessionsExcel: builder.mutation({
            query:({search}:{search?:string|null})=>({
                url:base_url+"in-active/",
                params:{search, excel:true}
            }),
        }),
        // --------------

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
} = sessionsApiSlice    