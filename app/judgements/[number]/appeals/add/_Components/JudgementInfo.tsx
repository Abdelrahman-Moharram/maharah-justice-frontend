import BasicCard from '@/Components/Cards/BasicCard'
import { ImageSkeleton } from '@/Components/Common'
import React from 'react'

interface appeal{
    prosecuter: string,
    defendant:string,
    date_ar:string,
    result:string
}
interface Props{
    appeal:appeal,
    isLoading: boolean
}
const Skeleton = () =>(
    <>
        <ImageSkeleton
            width='100%'
            height='150px'
            rounded='10px'
            shadow
        />
        <ImageSkeleton
            width='100%'
            height='150px'
            rounded='10px'
            shadow
        />
        <div className="col-span-2">
            <ImageSkeleton
                width='100%'
                height='150px'
                rounded='10px'
                shadow
            />
        </div>
        <div className="col-span-2">
            <ImageSkeleton
                width='100%'
                height='250px'
                rounded='10px'
                shadow
            />
        </div>
    </>
)
const JudgementInfo = ({appeal, isLoading}:Props) => {
  return (
    <div className='grid grid-cols-2 gap-2'>
        {
            isLoading?
                <Skeleton/>
            :
            <>
                <BasicCard
                    cardBg='bg-[#F4F4F4]'
                    title={'المستأنف'}
                    textcolor='#000'
                    value={appeal.prosecuter}
                />
                <BasicCard
                    cardBg='bg-[#F4F4F4]'
                    title={'المستأنف ضده'}
                    textcolor='#000'
                    value={appeal.defendant}
                />
                <div className="col-span-2">
                    <BasicCard
                        cardBg='bg-[#F4F4F4]'
                        title={'تاريخ الحكم'}
                        textcolor='#000'
                        value={appeal.date_ar}
                    />
                </div>
                <div className="col-span-2">
                    <BasicCard
                        cardBg='bg-[#F4F4F4]'
                        title={'نص الحكم'}
                        textcolor='#000'
                        value={appeal.result}
                    />
                </div>
            </>
        }
        
    </div>
  )
}

export default JudgementInfo
