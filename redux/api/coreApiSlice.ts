import { apiSlice } from "../services/apiSlice";

const base_url = 'core/'
const coreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getUnReadNotificationsCount: builder.mutation({
            query:()=>{                
                return ({
                    url:base_url+`notifications/unread-count/`,
                    method:'GET',
                })
            }
        }),
        getNotifications: builder.mutation({
            query:({size}:{size?:string|undefined})=>{                
                return ({
                    url:base_url+`notifications/`,
                    method:'GET',
                    params:{size}
                })
            }
        }),
        readNotifications: builder.mutation({
            query:()=>{                
                return ({
                    url:base_url+`notifications/read/`,
                    method:'GET',
                })
            }
        }),
        
    }) 
})


export const {
    useGetNotificationsMutation,
    useReadNotificationsMutation,
    useGetUnReadNotificationsCountMutation
} = coreApiSlice

