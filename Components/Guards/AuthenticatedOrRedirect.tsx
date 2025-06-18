import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

const AuthenticatedOrRedirect = ({children}:{children:React.ReactNode}) => {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {        
        if (!Cookies.get('access_token')) {           
            router.push(`/auth/login?next=${pathname}`)
        }
    }, [Cookies.get('access_token')])
    return(
        children 
    )
}


export default AuthenticatedOrRedirect