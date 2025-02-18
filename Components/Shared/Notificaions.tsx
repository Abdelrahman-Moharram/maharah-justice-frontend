'use client'
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react'
import { ImFileEmpty } from 'react-icons/im';
import NotificationDropdownItem from './NotificationDropdownItem';
import { useGetNotificationsMutation, useGetUnReadNotificationsCountMutation, useReadNotificationsMutation } from '@/redux/api/coreApiSlice';
import RandomSkeleton from '../Common/RandomSkeleton'
interface notificationType{
  sender: string,
  receiver: string,
  message: string,
  date: string,
  module: string,
  instance: string,
  is_read: boolean
}

const Notifications = () => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [notificationToggler, setNotificationToggler] = useState(false)
  const [notification_count, setNotifications] = useState<number>(0)

  const [getNotificaions, {data, isLoading}] = useGetNotificationsMutation()
  const [readNotifications] = useReadNotificationsMutation()
  const [unReadNotificationsCount] = useGetUnReadNotificationsCountMutation()

  const {id} = useAppSelector(state=>state.auth.user)
  
  

  useEffect(() => {
    if(id){
      connectWebSocket();
      unReadNotificationsCount(undefined)
        .unwrap()
        .then(res=>{
          setNotifications(res?.count || 0)        
        })
    }
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [id]);
  
  
  const connectWebSocket = () => {
    if (!id)
      return 

    const WS_URL = `${process.env.NEXT_PUBLIC_HOST_WS}/ws/notify/${id}/`
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setNotifications(notification_count +  (isNaN(message?.message)?  1 : message?.message))

    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {      
      setTimeout(() => connectWebSocket(), 5000); // Reconnect after 5 seconds
    };

    setWebSocket(ws);
  };
  
   
  const handleReadNotification = () =>{
    setNotificationToggler(!notificationToggler)
    setNotifications(0)
    getNotificaions({size:'10'})
    readNotifications({})
    // if(notificationToggler){
    // }
  }
  
  return (
    <>
      <button 
          onClick={handleReadNotification} 
          className="relative rounded-full p-1.5 border transition-all cursor-pointer  hover:bg-gray-200"
      >
        {
          notification_count ?
          <>
            {/* 
            <div className="absolute">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="8" r="3.5" fill="#F23D30" stroke="#FBFBFB"/>
                </svg>
            </div> 
            */}
            <span className='absolute -mr-2 -mt-1 top-0 right-0 px-[5px] bg-[#F23D30] rounded-full text-white text-sm'>{notification_count>99 ? '99+' : notification_count }</span>
          </>
          :
          null
        }
        
        
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.02 2.91003C8.70997 2.91003 6.01997 5.60003 6.01997 8.91003V11.8C6.01997 12.41 5.75997 13.34 5.44997 13.86L4.29997 15.77C3.58997 16.95 4.07997 18.26 5.37997 18.7C9.68997 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.91003C18.02 5.61003 15.32 2.91003 12.02 2.91003Z" stroke="#5F6060" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke="#5F6060" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#5F6060" strokeWidth="1.5" strokeMiterlimit="10"/>
            </svg>

      </button>
      {
        notificationToggler?
          <div className='absolute end-10 top-[60px] max-w-[40rem] bg-white rounded-md shadow-lg px-2 py-2 z-10 my-3 max-h-[70%] overflow-y-auto space-y-2'>
          {
            isLoading?
                <RandomSkeleton 
                    height='70px'
                    width='400px'
                    margin='10px 0px'
                    rounded='7px'
                    shadow
                />
            :
                data?.notifications?.length?
                    data.notifications.map((notification:notificationType)=>(
                        <NotificationDropdownItem notification={notification} key={notification.date} />
                    ))
                :
                <div className='py-3 px-20'>
                    <p className='text-lg font-bold flex gap-4 items-center'>
                        <ImFileEmpty /> 
                        لا توجد إشعارات
                    </p>
                </div>
          }
          </div>
        :null
      }
    </>
  )
}

export default Notifications