import SmallCard from '@/Components/Cards/SmallCard'
import { cosultationType } from '@/Components/Types/sessions'
import React from 'react'


const ConsultationDetails = ({cosultation, isLoading}:{cosultation:cosultationType, isLoading:boolean}) => {

  return (
    <div>
        
        <div className='flex justify-between items-center p-4 rounded-md mb-4'>
          <div className="font-bold text-2xl">{cosultation?.case_number}</div>
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
