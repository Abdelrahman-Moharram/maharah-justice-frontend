import React from 'react'

interface Props{
  title: string,
  color: string
}
const handleBGColor = (color:string) =>{
  switch (color){
    case 'red':
      return 'bg-red-500 text-white'
    case 'green':
      return 'bg-green-500 text-white'
    case 'default':
      return 'bg-container text-white'
    case 'blue':
      return 'bg-blue-500 text-white'
    case 'blue':
      return 'bg-blue-500 text-white'
    case 'dark':
      return 'bg-black text-white'
    default:
      return 'bg-white text-dark'
  }
}
export const DefaultBadge = ({title, color}:Props) => {

  return (
    <span className={"whitespace-nowrap drop-shadow-md text-md px-2 rounded-md py-1 font-extralight "+handleBGColor(color)}> 
      {title} 
    </span>
  )
}
