import SmallCard from '@/Components/Cards/SmallCard'
import { Steps } from '@/Components/utils'
import { useGetConsultationDetailsQuery, useReadConsultationMutation } from '@/redux/api/sessionsApi'
import React, { useEffect } from 'react'
import ReplyForm from './ReplyForm'
import { useRouter } from 'next/navigation'
import Chat from '@/Components/Cards/Chat/Chat'

interface Props{
  handleOpen?:()=>void,
  open?:boolean,
  consult_id:string
}

const ConsultationDetails = ({consult_id, handleOpen, open}:Props) => {
  const [readConsultation] = useReadConsultationMutation()
  const {data, isLoading} = useGetConsultationDetailsQuery({consult_id}, {refetchOnFocus:true, refetchOnMountOrArgChange:true})
  const router  = useRouter()

  useEffect(()=>{    
    if (consult_id && !isLoading && !data?.cosultation?.can_reply){
      readConsultation({consult_id})
    }
  }, [data?.cosultation?.session])

  const action = () =>{
    if (handleOpen)
      return handleOpen()
    else
      router.push('/consultations')
  }
  
  return (
    <>
      <div className={`overflow-y-auto max-h-[82%]`}>
        <div className="grid grid-cols-4 items-center gap-3 px-4 rounded-md">
          <SmallCard 
            keyName={'رقم القضية'}
            value={data?.cosultation?.case_number}
          />
          <SmallCard
            keyName={'تاريخ الجلسة'}
            value={data?.cosultation?.date_ar}
          />
          <SmallCard 
            keyName={'حالة الجلسة'}
            value={data?.cosultation?.state}
          />

          <div className="col-span-1">
            <SmallCard
              keyName={'المرسل'}
              value={data?.cosultation?.sender_name}
            />
          </div>
        </div>
        
        <div className="mb-5 mt-3 bg-container drop-shadow-lg rounded-xl overflow-hidden mx-5">
          <Steps
            steps={data?.cosultation?.stages}
          />
        </div>
          

          
        <div className="p-4">
          <SmallCard
            keyName={'الإستشارة'}
            value={data?.cosultation?.message}
          />
          {
            data?.cosultation?.replies?.length?
              <div className="mt-5 bg-card p-5 rounded-lg">
                <Chat
                  messages={data?.cosultation?.replies}
                />
              </div>
            :null
          }
        </div>
      </div>
      <div className="absolute bottom-10 left-5 right-5">
        <ReplyForm
          consult_id={consult_id}
          open={open}
          action={action}
        />
      </div>
    </>
  )
}

export default ConsultationDetails
