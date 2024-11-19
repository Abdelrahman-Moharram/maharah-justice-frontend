import React from 'react'


interface props{
    keyName:string;
    value:string | undefined
}
const SmallCard = ({keyName, value}:props) => {
   
  return (
    <div
        className="block rounded-xl drop-shadow-sm p-4 shadow-lg bg-container focus:outline-none focus:ring"
    >
        <p className="mt-2 text-[14px]">{keyName}</p>
        <h2 className="font-bold text-[18px]">
            {value}
        </h2>
    </div>
  )
}

export default SmallCard