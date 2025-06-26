import OverLay from '@/Components/Modals/OverLay'
import React from 'react'
import UserForm from './CustomerForm'
import CustomerForm from './CustomerForm'

interface Props{
    handleOpen: ()=>void,
    open: boolean,
    customerId?:string
}
const CustomerFormOverLay = ({handleOpen, open, customerId}:Props) => {
  
  return (
    <OverLay
        handleOpen={handleOpen}
        open={open}
        title={customerId?'تعديل عميل':'إضافة عميل'}
    >
      <CustomerForm
        action={handleOpen}
        open={open}
        customerId={customerId}
      />
    </OverLay>
  )
}

export default CustomerFormOverLay
