import React from 'react'
import { MessageType } from './ChatTypes'
import { beautify_date } from '@/Components/utils/helper'


const Message = ({message}:{message:MessageType}) => {
  return (
    <div
        className={`block my-2 drop-shadow-sm p-4 shadow-lg bg-container focus:outline-none focus:ring overflow-hidden ${message.is_by_me?'rounded-l-xl rounded-tr-xl ':'rounded-tl-xl rounded-r-xl'}`}
    >
        <div className={`mt-2 ${message?.is_by_me?'text-start':'text-end'}`}>
            <div className={`font-extrabold text-[14px] mb-1`}>
                    {message.sender}
            </div>
            <div className="font-light text-xs">{beautify_date(message.sent_at)}</div>
        </div>
        <h2 className="font-[400]  text-[18px]">
            {message.message}
        </h2>
    </div>
  )
}

export default Message
