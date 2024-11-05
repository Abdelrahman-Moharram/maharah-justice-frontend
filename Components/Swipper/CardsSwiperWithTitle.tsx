import React from 'react'
import { Divider, ImageSkeleton } from '@/Components/Common';
import { CardsSwiper } from '@/Components/Swipper';
import { caseHomeCardType } from '../Types/case';
import Link from 'next/link';
import EmptyData from '../Common/EmptyData';

interface props{
    cases:caseHomeCardType[];
    title:string,
    handleCaseNumber:(case_number:string)=>void
    handleDetailsModal:()=>void,
    count:number,
    link:string,
    isLoading: boolean

}

const CardsSwiperWithTitle = ({cases, title, handleCaseNumber, handleDetailsModal, count, link, isLoading}:props) => {
  const handleImageSkeleton = ()=>{
    const total = [];
    for(let i=0; i < 2; i ++)
        total.push(<ImageSkeleton key={i} width='800px' height='300px' rounded='10px' />)
    return total
  }
  return (
    <div className='my-3'>
        <div className='flex justify-between px-12'>
          <p className="font-semibold text-xl">{title}</p>
          <Link href={link} className="text-primary text-[16px] font-[600]">عرض الجميع ({count})</Link>
        </div>
        <div className="my-4">
          {
            isLoading?
              <div className="flex gap-3 justify-center">
                {handleImageSkeleton()}
              </div>
            :
            cases?.length?
              <CardsSwiper 
                cases={cases} 
                handleCaseNumber={handleCaseNumber}
                handleDetailsModal={handleDetailsModal}
              />
            :
            <div className="px-12">
              <EmptyData 
                height='200px'
                message='لا توجد قضايا'
              />  
            </div>          
          }
        </div>
    </div>
  )
}

export default CardsSwiperWithTitle