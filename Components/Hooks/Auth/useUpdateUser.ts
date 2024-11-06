import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import { setAuth } from '@/redux/features/authSlice'
import { useAppDispatch } from '@/redux/hooks'

export default function useUpdateUser (){
    const {data, isLoading} = useRetrieveUserQuery()
    const dispatch = useAppDispatch()
    dispatch(setAuth(data))
    return {
        data, 
        isLoading,
    }
}

