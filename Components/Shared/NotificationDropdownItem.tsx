import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface notificationType{
    sender: string,
    receiver: string,
    message: string,
    date: string,
    module: string,
    instance: string,
    is_read: boolean
}
interface Props{
    notification: notificationType
}

const NotificationDropdownItem = ({notification}:Props) => {
    
    const created_date = () => {
        const date = new Date(notification.date)
        return date.toUTCString()
    }
  return (
    <Link href={`/${notification.module+'/'+notification.instance}}`} className={'max-w-[500px] flex items-center gap-2 hover:bg-gray-200 p-3 rounded-lg ' + (!notification.is_read?'bg-gray-100':null)}>
        
        
        <div>
            <p className=''>
                {notification.message}
                {
                    notification.sender?
                        <>
                            بواسطة
                            <span className='text-lg font-bold mx-2'>{notification.sender}</span> 
                        </>
                    :null
                }
            </p>
            <span className='text-sm text-gray-500'>{created_date()}</span>
        </div>      
    </Link>
  )
}

export default NotificationDropdownItem