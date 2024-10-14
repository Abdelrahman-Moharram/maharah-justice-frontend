'use client'
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
interface Props{
    children: React.ReactNode
}
const layout = ({children}:Props) => {
    const router = useRouter();
    const {isAuthenticated, isLoading} = useAppSelector(state=>state.auth)
    useEffect(() => {        
        if (isAuthenticated && !isLoading) {
            router.push('/');
        }
    }, [router]);
  return (
    children
  )
}

export default layout
