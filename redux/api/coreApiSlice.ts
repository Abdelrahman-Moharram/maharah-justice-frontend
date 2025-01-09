import { apiSlice } from "../services/apiSlice";

const base_url = 'core/'
const coreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
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
    useReadNotificationsMutation
} = coreApiSlice

