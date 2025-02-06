import React from 'react'

const EmptyData = ({message, height}:{message:string, height:string}) => {
  return (
    <div className={`flex items-center justify-center rounded-md w-full h-[${height}] font-semibold bg-card`}>{message}</div>
  )
}

export default EmptyData
