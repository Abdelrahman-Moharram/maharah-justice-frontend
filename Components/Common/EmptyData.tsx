import React from 'react'

const EmptyData = ({message, height}:{message:string, height:string}) => {
  return (
    <div style={{height:height}} className={`flex items-center justify-center rounded-md w-full font-semibold bg-card`}>{message}</div>
  )
}

export default EmptyData
