'use client'
import { useAppSelector } from '@/redux/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

interface Props{
    children: React.ReactNode
}
const layout = ({children}:Props) => {
  const searchParams = useSearchParams()
  const next = searchParams.get('next')
  
  const router = useRouter();
  const {isAuthenticated, isLoading} = useAppSelector(state=>state.auth)
  useEffect(() => {   
    if (isAuthenticated && !isLoading) {
      if (next?.includes('login'))
        return router.push('/');
      return router.push(next || '/');
    }
  }, [router, isAuthenticated, isLoading]);
  return (
    children
  )
}

export default layout
