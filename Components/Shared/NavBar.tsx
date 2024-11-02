'use client'
import React from 'react'
import UserNavDropDown from './UserNavDropDown';
import { useAppSelector } from '@/redux/hooks';

const NavBar = () => {
    const { isAuthenticated, user, isLoading } = useAppSelector(state => state.auth);
    const authLinks = () => {                
        return (
            <>
                <UserNavDropDown user={user} />
    
            </>
        );
    }


  return (
<header className="px-4 w-full z-10">
    <div className="mx-auto flex items-center gap-8 py-5">
        <div className="flex flex-1 items-center justify-end md:justify-between">
            <div className="w-[60%]">
                <input
                    className='w-full py-2 px-5 bg-card outline-none border-none rounded-lg'
                    placeholder='ابحث برقم العميل أو القضية أو رقم الهوية أو رقم الجوال'
                />
            </div>

            <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                    <div className="sm:flex sm:gap-4">
                    {
                        isAuthenticated || isLoading?
                            authLinks()
                        :
                            null
                    }
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
  )
}

export default NavBar
