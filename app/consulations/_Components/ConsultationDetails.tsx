import SmallCard from '@/Components/Cards/SmallCard'
import { cosultationType } from '@/Components/Types/sessions'
import { Steps } from '@/Components/utils'
import { useReadConsultationMutation } from '@/redux/api/sessionsApi'
import React, { useEffect } from 'react'


const ConsultationDetails = ({cosultation, isLoading, consult_id, can_replay}:{cosultation:cosultationType, isLoading:boolean, consult_id:string, can_replay:boolean}) => {
  const [readConsultation] = useReadConsultationMutation()

  useEffect(()=>{    
    if (consult_id && !isLoading && !can_replay){
      readConsultation({consult_id})
    }
  }, [cosultation?.session])
  return (
    <div>
        <div className="w-[90%] mx-auto mb-24 mt-12">
          <Steps
            steps={cosultation?.stages}
          />
        </div>
        

        <div className="grid grid-cols-3 items-center gap-3 p-4 rounded-md mb-4">
          <SmallCard 
            keyName={'رقم القضية'}
            value={cosultation?.case_number}
          />
          <SmallCard
            keyName={'تاريخ الجلسة'}
            value={cosultation?.date_ar}
          />
          <SmallCard 
            keyName={'حالة الجلسة'}
            value={cosultation?.state}
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-3 p-4 rounded-md mb-4">
          {/* ---------- */}
          
          {
            cosultation?.can_replay?
              <div className="col-span-2">
                <SmallCard
                  keyName={'المرسل'}
                  value={cosultation?.sender_name}
                />
              </div>
            :
              <>
                <SmallCard
                  keyName={'المرسل'}
                  value={cosultation?.sender_name}
                />
                <SmallCard 
                  keyName={'المستلم'}
                  value={cosultation?.receiver_name}
                />
              </>
          }
          {/* ---------- */}
        </div>
        <div className="p-4">
          <SmallCard
            keyName={'الإستشارة'}
            value={cosultation?.message}
          />
          {
            cosultation?.replay?
            <div className='mt-5'>
              <SmallCard
                keyName={`الرد (${cosultation?.replied_at})`}
                value={cosultation?.replay}
              />
            </div>
            :null
          }
        </div>

    </div>
  )
}

export default ConsultationDetails
