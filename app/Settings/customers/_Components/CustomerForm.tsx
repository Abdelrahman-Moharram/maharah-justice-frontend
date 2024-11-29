import Button from '@/Components/Common/Button'
import { Input, SelectInput } from '@/Components/Forms'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import OverLayFuncArea from '@/Components/Modals/OverLayFuncArea'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface baseType{
    id:string,
    name:string,
    
    
}
const CustomerForm = ({action, open, customerId}:{action:()=>void, open:boolean, customerId?:string}) => {
   
    
  return (
    <div className='relative min-h-[80%] px-12 mt-12'>
        <div className="grid grid-cols-2 gap-3 p-2 overflow-y-auto">
            test
        </div>
        <OverLayFuncArea
            open={open}
        >
            <Button  className='bg-primary hover:bg-transparent border-primary' title={'حفظ'} isLoading={false} />
            <Button 
                onClick={action}
                className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
                title={'إلغاء'} 
                isLoading={false}
            />
        </OverLayFuncArea>
    </div>
  )
}

export default CustomerForm
