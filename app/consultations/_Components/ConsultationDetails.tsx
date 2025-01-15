import SmallCard from '@/Components/Cards/SmallCard'
import { Steps } from '@/Components/utils'
import { useGetConsultationDetailsQuery, useReadConsultationMutation } from '@/redux/api/sessionsApi'
import React, { useEffect } from 'react'
import ReplyForm from './ReplyForm'
import { useRouter } from 'next/navigation'
import Chat from '@/Components/Cards/Chat/Chat'
import ApproveReject from './ApproveReject'

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
      <div >
        
        {
          data?.cosultation?.can_approve?
            <ApproveReject 
              consult_id={consult_id}
            />
          :null
        }

        <div className="grid grid-cols-4 mt-5 items-center gap-3 px-4 rounded-md">
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

          {/* <BasicCard 
            title={'حالة الجلسة'}
            cardBg='bg-container'
            textcolor={handleCaseBadgeColor(data?.cosultation?.state)}
            value={data?.cosultation?.state}
            shadow
          /> */}

          <div className="col-span-1">
            <SmallCard
              keyName={'المرسل'}
              value={data?.cosultation?.sender_name}
            />
          </div>
        </div>
        
        <div className="mb-5 mt-3 bg-container drop-shadow-lg rounded-xl overflow-hidden mx-4 px-3">
          <Steps
            steps={data?.cosultation?.stages}
          />
        </div>
          

          
        <div className="p-4">
          <SmallCard
            keyName={'موضوع الإستشارة'}
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
      <div className={`transition-all delay-300 mb-2 ${open !== false?'bottom-20':'-bottom-20'} mx-4 px-0 bg-container drop-shadow-lg rounded-xl`}>
        {
          data?.consultation?.can_reply?
            <ReplyForm
              consult_id={consult_id}
              open={open}
              action={action}
            />
          :null
        }
      </div>
    </>
  )
}

export default ConsultationDetails
