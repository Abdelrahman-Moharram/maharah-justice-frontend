import React from 'react'
import { Divider, ImageSkeleton } from '@/Components/Common';
import { CardsSwiper } from '@/Components/Swipper';
import { caseHomeCardType } from '../Types/case';
import Link from 'next/link';

interface props{
    cases:caseHomeCardType[];
    title:string,
    handleCaseNumber:(case_number:string)=>void
    handleDetailsModal:()=>void,
    count:number,
    link:string
}

const CardsSwiperWithTitle = ({cases, title, handleCaseNumber, handleDetailsModal, count, link}:props) => {
  const handleImageSkeleton = ()=>{
    const total = [];
    for(let i=0; i < 4; i ++)
        total.push(<ImageSkeleton key={i} width='340px' height='504px' rounded='10px' />)
    return total
  }
  return (
    <div className='my-3'>
        <div className='flex justify-between'>
          <p className="font-semibold text-xl">{title}</p>
          <Link href={link} className="text-primary text-[16px] font-[600]">عرض الجميع ({count})</Link>
        </div>
        <div className="my-4">
          {
            cases?.length?
              <CardsSwiper 
                cases={cases} 
                handleCaseNumber={handleCaseNumber}
                handleDetailsModal={handleDetailsModal}
              />
            :
            <div className="flex gap-3">
              {handleImageSkeleton()}
            </div>
          }
        </div>
    </div>
  )
}

export default CardsSwiperWithTitle