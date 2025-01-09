import OverLay from '@/Components/Modals/OverLay'
import React from 'react'
import CaseDetails from './CaseDetails'
import FullHModal from '@/Components/Modals/FullHModal'

interface Props{
    handleToggler:()=>void
    open:boolean,
    case_number:string
}
const CaseDetailsOverLay = ({open, handleToggler, case_number}:Props) => {
  return (
    <FullHModal
      handleToggler={handleToggler}
      open={open}  
    >
      <CaseDetails
        case_number={case_number}          
      />
    </FullHModal>
  )
}

export default CaseDetailsOverLay
