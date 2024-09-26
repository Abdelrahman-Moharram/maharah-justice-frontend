'use client'
import SideNav from '@/Components/Shared/SideNav'
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import { setAuth } from '@/redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaHome, FaTrash } from 'react-icons/fa'
import { FaBarsStaggered } from 'react-icons/fa6'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdManageAccounts } from 'react-icons/md'
import { RiMovieLine } from 'react-icons/ri'

interface Props{
    children: React.ReactNode
}
const CustomLayout = ({children}:Props) => {
    const {data} = useRetrieveUserQuery()
    const dispatch = useAppDispatch()
    dispatch(setAuth(data))

    const {isAuthenticated, isLoading} = useAppSelector(state=>state.auth)
    const [toggle, setToggle] = useState(true)
    
    return (
        <>
        {
            isAuthenticated === true && !isLoading?
                <div className='flex gap-2 items-center px-2'>
                    <SideNav />
                    <div className="min-h-[calc(100vh-78px)] w-full mx-auto rounded-lg overflow-hidden">            
                        {children}
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
