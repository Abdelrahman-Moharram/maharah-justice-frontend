import React from 'react'
import { MessageType } from './ChatTypes'
import Message from './Message'


const Chat = ({messages}:{messages:MessageType[]}) => {
  return (
    <div className=''>
      {
        messages?.map((message, idx)=>(
          <div className={`w-full flex ${message.is_by_me?'justify-start':'justify-end'}`}>
            <div className="block max-w-[90%] min-w-[25%]">
              <Message 
                message={message}
                key={message?.message + idx}
              />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Chat
