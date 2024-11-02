import React from 'react'

interface Props{
  title: string,
  color: string
}
export const DefaultBadge = ({title, color}:Props) => {

  return (
    <span className={`whitespace-nowrap drop-shadow-md text-md px-2 rounded-md py-1 font-extralight text-white bg-[${color}]`}> 
      {title} 
    </span>
  )
}
