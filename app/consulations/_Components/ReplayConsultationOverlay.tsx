import { useGetConsultationDetailsQuery } from '@/redux/api/sessionsApi'
import React from 'react'
import ConsultationDetails from './ConsultationDetails'
import OverLay from '@/Components/Modals/OverLay'
import ReplayForm from './ReplayForm'

const ReplayConsultationOverlay = ({consult_id, open, handleOpen}:{consult_id:string, handleOpen:()=>void, open:boolean}) => {
  const {data, isLoading} = useGetConsultationDetailsQuery({consult_id})

  return (
    <OverLay 
      handleOpen={handleOpen}
      open={open}
    >
      <ConsultationDetails 
        cosultation={data?.cosultation}
        isLoading={isLoading}
        consult_id={consult_id}
        can_replay={data?.cosultation?.can_replay}
      />

      {
        data?.cosultation?.can_replay?
          <div className="p-4">
            <ReplayForm
              consult_id={consult_id}
              open={open}
              handleOpen={handleOpen}
            />
          </div>
        :null
      }
      
    </OverLay>
  )
}

export default ReplayConsultationOverlay
