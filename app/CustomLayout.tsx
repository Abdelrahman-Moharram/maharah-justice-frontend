'use client'
import NavBar from '@/Components/Shared/NavBar'
import SideNav from '@/Components/Shared/SideNav'
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import { setAuth } from '@/redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { usePathname, useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import Cookies from "js-cookie"


interface Props {
    children: React.ReactNode
}

const CustomLayout = ({ children }: Props) => {
    const { data } = useRetrieveUserQuery()
    const dispatch = useAppDispatch()
    
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        // Set authentication state when data is retrieved        
        if (data) {
            dispatch(setAuth(data))
        }
    }, [data, dispatch])

    useEffect(() => {
        // Redirect if not authenticated and loading is complete
        
        if (!Cookies.get('access_token')) {
            router.push(`/auth/login?next=${pathName}`)
        }
    }, [Cookies.get('access_token')])
    
    return (
        <>
            {Cookies.get('access_token') ? (
                <div className='flex gap-2 bg-secondary'>
                    <SideNav />
                    <div className="px-0 w-full min-h-[calc(100vh)] mx-auto overflow-hidden">
                        <NavBar />
                        <div className="bg-container h-full p-10 rounded-tr-2xl">
                            <Suspense>
                                {children}
                            </Suspense>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-container p-10 h-full rounded-tr-2xl">
                    <Suspense>
                        {children}
                    </Suspense>
                </div>
            )}
        </>
        
    )
}

export default CustomLayout
