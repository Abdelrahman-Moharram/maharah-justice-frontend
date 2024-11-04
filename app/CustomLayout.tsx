'use client'
import NavBar from '@/Components/Shared/NavBar'
import SideNav from '@/Components/Shared/SideNav'
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import { setAuth } from '@/redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { usePathname, useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'


interface Props{
    children: React.ReactNode
}
const CustomLayout = ({children}:Props) => {
    const {data} = useRetrieveUserQuery()
    const dispatch = useAppDispatch()
    dispatch(setAuth(data))

    const pathName = usePathname()
    const router = useRouter();
    const {isAuthenticated, isLoading} = useAppSelector(state=>state.auth)

    useEffect(() => {        
        if (!isAuthenticated && !isLoading) {            
            return router.push('/auth/login?next='+pathName);
        }
    }, [router]);
    return (
        <Suspense>
        {
            isAuthenticated?
                <div className='flex gap-2 '>
                    <SideNav />
                    <div className="px-10 w-full min-h-[calc(100vh-78px)] mx-auto overflow-hidden">
                        <NavBar />
                        {isAuthenticated?children:null}
                    </div>
                </div>
            :
            <div>
                    {children}
            </div>
        }
        </Suspense>
    )
}

export default CustomLayout