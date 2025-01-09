'use client'
import React from 'react'
import UserNavDropDown from './UserNavDropDown';
import { useAppSelector } from '@/redux/hooks';
import NavBarSearch from './NavBarSearch';
import Notifications from './Notificaions';
import Cookies from "js-cookie"

const NavBar = () => {
    const { isAuthenticated, user, isLoading } = useAppSelector(state => state.auth);
    
    const authLinks = () => {                
        return (
            <>
                <Notifications />
                <UserNavDropDown user={user} />
            </>
        );
    }

  return (
<>
    {
        Cookies.get('access_token')?
            <header className="px-4 w-full z-[3]">
                <div className="mx-auto flex items-center gap-8 py-5">
                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <NavBarSearch />

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
        :null
    }
</>
  )
}

export default NavBar
