'use client'
import NavBar from '@/Components/Shared/NavBar'
import SideNav from '@/Components/Shared/SideNav'
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import { setAuth } from '@/redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


interface Props{
    children: React.ReactNode
}
const CustomLayout = ({children}:Props) => {
    const {data, isLoading:userLoaing} = useRetrieveUserQuery()
    const dispatch = useAppDispatch()
    const router = useRouter()
    dispatch(setAuth(data))

    const {isAuthenticated, isLoading} = useAppSelector(state=>state.auth)
    useEffect(()=>{
        if(!isAuthenticated && !isLoading && userLoaing === false){
            router.push('/auth/login')
        }
    },[isAuthenticated, isLoading])
    return (
        <>
        {
            isAuthenticated || userLoaing?
                <div className="">
                    <NavBar />
                    <div className='flex gap-2 pt-[64px] items-center px-2'>
                        <SideNav />
                        <div className="min-h-[calc(100vh-78px)] w-full mx-auto rounded-lg overflow-hidden">            
                            {userLoaing?null:children}
                        </div>
                    </div>
                </div>
            :
                <div>
                    {children}
                </div>
        }
        </>
    )
}

export default CustomLayout
