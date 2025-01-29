import BaseModal from '@/Components/Modals/BaseModal'
import React from 'react'
import AddConsultationsForm from './AddConsultationsForm'

interface Props{
    handleToggler:()=>void,
    open:boolean,
    session_id:string
}
const AddConsultationModal = ({session_id, open, handleToggler}:Props) => {
  return (
    <BaseModal
        handleToggler={handleToggler}
        open={open}
        containerClassName='min-w-[100%] py-12 px-12'
    >
      <AddConsultationsForm
        session_id={session_id}
        cancelAction={handleToggler}
      />
    </BaseModal>
  )
}

export default AddConsultationModal
