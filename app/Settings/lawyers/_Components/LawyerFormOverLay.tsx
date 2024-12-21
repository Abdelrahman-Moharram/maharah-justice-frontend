import OverLay from '@/Components/Modals/OverLay'
import React from 'react'
import UserForm from './LawyerForm'
import LawyerForm from './LawyerForm'

interface Props{
    handleOpen: ()=>void,
    open: boolean,
    lawyer?:string
}
const LawyerFormOverLay = ({handleOpen, open, lawyer}:Props) => {
  
  return (
    <OverLay
        handleOpen={handleOpen}
        open={open}
        title={lawyer?'تعديل محامي':'إضافة محامي'}
    >
      <LawyerForm 
        action={handleOpen}
        open={open}
        lawyerId={lawyer}
      />
    </OverLay>
  )
}

export default LawyerFormOverLay
