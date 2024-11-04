import React from 'react'
import { ImageSkeleton } from '../Common';

interface Props{
    title: string;
    value: string;
    textcolor: string,
    cardBg:string,
    textSize?: string
}

const BasicCard = ({title, value, textcolor, cardBg, textSize='24px'}:Props) => {    
  return (
    <div className={cardBg+" py-5 rounded-md text-center"}>
        {
            title && value ?
            <>
                <span className={`block text-[${textSize}]`}>
                    {title}
                </span>
                <span className={`text-[${textcolor}] text-[${textSize}] font-bold flex justify-center items-center fw-[700]`}>
                    {value}
                </span>
            </>
            :
            <ImageSkeleton width='100%' height='100%' />
        }
    </div>
  )
}

export default BasicCard
