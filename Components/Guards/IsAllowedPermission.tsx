import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { usePathname, useRouter } from 'next/navigation'

export const IsAllowedPermissionOrNull = ({permission, children}:{permission:string, children:React.ReactNode}) => {
    const {permissions} = useAppSelector(state=>state.auth.user)
    

    return (
        <>
            {
                permissions?.includes(permission)?
                    children
                :
                    null
            }
        </>
    )
}

export const IsAllowedPermissionOrRedirect = ({permission, children}:{permission:string, children:React.ReactNode}) => {
    const {permissions} = useAppSelector(state=>state.auth.user)
    const router = useRouter()
    const pathname= usePathname()
    
    useEffect(() => {        
        if (!(permission && permissions.includes(permission))) {           
            router.back();
        }
    }, [permission, pathname])

    return (
        children
    )
}

export const IsAllowedPermissionOrFalse = (permission:string) =>{
    if(permission){
        const {permissions} = useAppSelector(state=>state.auth.user)
        return permissions.includes(permission)
    }
    return true
}
