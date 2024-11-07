'use client'
import Button from '@/Components/Common/Button'
import BaseModal from '@/Components/Modals/BaseModal'
import { useDeleteCourtMutation } from '@/redux/api/utilsApi'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
interface courtType{
    id:string, 
    name:string
}
interface Props{
    handleToggler:()=>void,
    open:boolean,
    court: courtType | null
}
const DeleteCourtModal = ({handleToggler, open, court}:Props) => {   
    const [deleteCourt, {isLoading}] = useDeleteCourtMutation()

    const handleDeleteCourt = () =>{
        if(court?.id){
            deleteCourt({id: court?.id})
                .then(res=>{
                    handleToggler()
                    toast.success(res?.data?.message)
                })
                .catch(err=>{
                    console.log(err);
                    const error = err?.data?.message
                    toast.error(error||'حدث خطأ ما برجاء المحاولة لاحقا')        
                
                })
        }
        else{
            toast.error('خطأ أثناء اختيار المحكمة')
        }
    }
  return (
    <BaseModal
        handleToggler={handleToggler}
        open={open}
    >
        <div className="w-[50vw] py-8">
            <p className='text-red-500'>هل أنت متأكد من حذف  محكمة <span className='font-semibold'>"{court?.name}"</span> ؟</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleDeleteCourt} className='bg-red-500 hover:bg-transparent hover:text-black border-red-500 text-white' title={'حذف'} icon={<FaTrash />} isLoading={isLoading} />
            <Button 
                className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
                onClick={handleToggler}
                isLoading={false}
                title='إلغاء'
            />
      </div>
    </BaseModal>
  )
}

export default DeleteCourtModal
