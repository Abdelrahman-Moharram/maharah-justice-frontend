import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const NotAuthenticatedOrRedirect = ({children}:{children:React.ReactNode}) => {
    const router = useRouter()

    useEffect(() => {
        if(Cookies.get('access_token')){
            router.push("/")
        }
      }, [Cookies.get('access_token')]);

    return(
        children
    )
}

export default NotAuthenticatedOrRedirect