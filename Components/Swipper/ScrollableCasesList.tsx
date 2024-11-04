import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import CaseCard from '../Cards/CaseCard';
import { caseHomeCardType } from '../Types/case';

import 'swiper/css/pagination';

interface props{
    cases: caseHomeCardType[],
    handleDetailsModal:()=>void,
    handleCaseNumber:(case_number:string)=>void,
}
const ScrollableCasesList = ({cases, handleDetailsModal, handleCaseNumber}: props) => {
  return (
  <>
    {
      cases && cases.length > 0
        ?
        <Swiper
          slidesPerView={3.5}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 30
            },
        
            1270: {
              slidesPerView: 2,
              spaceBetween: 40
            },                  
          }}
          // spaceBetween={-40}
          
          loop={true}
          pagination={{ 
            clickable: true, 
            bulletActiveClass:"swiper-pagination-bullet-active"
           }}

          navigation={{
            hiddenClass:'color-primary',
            disabledClass:'color-primary',
          }}
          
          modules={[Pagination, Navigation]}
          className="mySwiper"                  
        >
            
          { 
            cases.map((Case:caseHomeCardType)=>(
                <SwiperSlide key={Case?.case_number} className='px-12'>
                  <CaseCard Case={Case} handleCaseNumber={handleCaseNumber} handleDetailsModal={handleDetailsModal}  />
                </SwiperSlide>
              ))
          }
        </Swiper>
    :null
  }
  </>


  )
}

export default ScrollableCasesList