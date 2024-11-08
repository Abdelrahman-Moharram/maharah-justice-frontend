import OverLay from '@/Components/Modals/OverLay'
import React from 'react'
import UserForm from './UserForm'
interface UserType{
  id?: string,
  full_name: string,
  username: string,
  role: string,
  user_type: string,
}
interface Props{
    handleOpen: ()=>void,
    open: boolean,
    userId?:string
}
const UserFormOverLay = ({handleOpen, open, userId}:Props) => {
  
  return (
    <OverLay
        handleOpen={handleOpen}
        open={open}
        title={userId?'تعديل مستخدم':'إضافة مستخدم'}
    >
      <UserForm 
        action={handleOpen}
        open={open}
        userId={userId}
      />
    </OverLay>
  )
}

export default UserFormOverLay
