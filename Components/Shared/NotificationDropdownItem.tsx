import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface notificationType{
    id: string;
    message: string;
    is_read: boolean;
    date: Date;
    receiver: string;
    sender: {
        id:string,
        username: string;
        image: string
    };
    post: string
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
    <Link href={`/posts/${notification.post}`} className={'max-w-[500px] flex items-center gap-2 hover:bg-gray-200 p-3 rounded-lg ' + (!notification.is_read?'bg-gray-100':null)}>
        <div>
            <Image 
                src={process.env.NEXT_PUBLIC_HOST + notification.sender.image}
                width={60}
                height={60}
                className='rounded-full'
                alt={notification.sender.username}
            />
        </div>
        
        <div>
            <p className=''>
                <span className='font-semibold'>{notification.sender.username}</span> 
                {notification.message}
            </p>
            <span className='text-sm text-gray-500'>{created_date()}</span>
        </div>      
    </Link>
  )
}

export default NotificationDropdownItem