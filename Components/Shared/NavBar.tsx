'use client'
import React from 'react'
import SwitchMode from './SwitchMode'
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
<header className="bg-negitaive-color shadow-lg fixed w-full z-10">
    <div className="mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-end md:justify-between">
            <div className="w-[33%]">
                <input
                    className='w-full py-2 px-5 bg-card outline-none border-none shadow-md rounded-lg'
                    placeholder='ابحث برقم القضية ...'
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
