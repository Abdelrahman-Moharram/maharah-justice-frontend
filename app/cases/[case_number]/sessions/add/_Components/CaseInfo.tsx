import BasicCard from '@/Components/Cards/BasicCard'
import { ImageSkeleton } from '@/Components/Common'
import { handleCaseBadgeColor } from '@/Components/utils/helper'
import React from 'react'


const hanldeSkeleton= () =>{
    const l = []
    for (let i = 0; i < 3; i++){
        l.push(
            <ImageSkeleton 
                height='115px'
                width='100%'
                rounded='10px'
            />
        )
    }
    return l
}
const CaseInfo = ({data, isLoading}:{data:any, isLoading:boolean}) => {
    const handleData = () =>{
        const l = []
        for(let i in data){            
            l.push(
                <BasicCard 
                    cardBg='bg-[#F4F4F4]'
                    textcolor={i === 'حالة القضية'?handleCaseBadgeColor(data[i]):data[i]}
                    title={i}
                    value={data[i]}
                />
            )
        }
        return  l
    }
  return (
    <div 
        className='grid grid-flow-col gap-4'
      >
        {
            !isLoading?
                handleData()
            :
                hanldeSkeleton()
        }
        
    </div>
  )
}

export default CaseInfo
