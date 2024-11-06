import Link from 'next/link';
import React from 'react'


interface props{
    keyName:string;
    value?:string | undefined,
    children?:React.ReactNode
}
const FnBasicCard = ({keyName, value, children}:props) => {
   
  return (
    <div
      className="flex justify-between items-center transition-all rounded-lg p-4 bg-card focus:outline-none focus:ring"
    >
        <div>
            <p className="">{keyName}</p>
            <h2 className="font-bold">
                {value}
            </h2>
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default FnBasicCard