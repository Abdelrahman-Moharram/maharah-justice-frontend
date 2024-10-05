'use client'
import NavBar from '@/Components/Shared/NavBar'
import SideNav from '@/Components/Shared/SideNav'
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import { setAuth } from '@/redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Cookies from "js-cookie"


interface Props{
    children: React.ReactNode
}
const CustomLayout = ({children}:Props) => {
    const {data} = useRetrieveUserQuery()
    const dispatch = useAppDispatch()
    dispatch(setAuth(data))
    const router = useRouter()

    const router = useRouter();
    const {isAuthenticated, isLoading} = useAppSelector(state=>state.auth)

    useEffect(() => {        
        if (!Cookies.get('access_token')) {
            router.push('/auth/login');
        }
    }, [router]);
    return (
        <>
        {
            isAuthenticated || isLoading?
                <div className="">
                    <NavBar />
                    <div className='flex gap-2 pt-[64px] items-center px-2'>
                        <SideNav />
                        <div className="min-h-[calc(100vh-78px)] w-full mx-auto rounded-lg overflow-hidden">            
                            {isLoading?null:children}
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
