import OverLay from '@/Components/Modals/OverLay'
import React from 'react'
import UserForm from './UserForm'
interface Props{
    handleOpen: ()=>void,
    open: boolean
}
const UserFormOverLay = ({handleOpen, open}:Props) => {
  return (
    <OverLay
        handleOpen={handleOpen}
        open={open}
        title='إضافة مستخدم'
    >
      <UserForm 
        action={handleOpen}
        open={open}
      />
    </OverLay>
  )
}

export default UserFormOverLay
