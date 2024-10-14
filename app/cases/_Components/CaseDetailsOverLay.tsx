import OverLay from '@/Components/Modals/OverLay'
import React from 'react'
import CaseDetails from './CaseDetails'

interface Props{
    handleToggler:()=>void
    open:Boolean,
    case_number:string
}
const CaseDetailsOverLay = ({open, handleToggler, case_number}:Props) => {
  return (
    <OverLay
        handleOpen={handleToggler}
        open={open}  
    >
      <CaseDetails
        case_number={case_number}          
      />
    </OverLay>
  )
}

export default CaseDetailsOverLay
