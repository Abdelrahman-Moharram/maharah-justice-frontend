import React from 'react'
import ConsultationDetails from './ConsultationDetails'
import OverLay from '@/Components/Modals/OverLay'

const ReplyConsultationOverlay = ({consult_id, open, handleOpen}:{consult_id:string, handleOpen:()=>void, open:boolean}) => {

  return (
    <OverLay 
      handleOpen={handleOpen}
      open={open}
    >
      <ConsultationDetails
        consult_id={consult_id}
        handleOpen={handleOpen}
        open={open}
      />
    </OverLay>
  )
}

export default ReplyConsultationOverlay
