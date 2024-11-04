import React from 'react'

interface Props{
  title: string,
  color: string
}
export const DefaultBadge = ({title, color}:Props) => {
  return (
    <span className={`whitespace-nowrap drop-shadow-md text-md px-2 rounded-md py-1 font-extralight text-white`} style={{backgroundColor:color}}> 
      {title} 
    </span>
  )
}

export const WideBadge = ({title, color}:Props) => {
  return (
    <span className={`text-center font-semibold whitespace-nowrap drop-shadow-md text-md w-[148px] overflow-x-hidden rounded-md py-1  text-white`} style={{backgroundColor:color}}> 
      {title} 
    </span>
  )
}
