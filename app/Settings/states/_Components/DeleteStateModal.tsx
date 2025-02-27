'use client'
import Button from '@/Components/Common/Button'
import BaseModal from '@/Components/Modals/BaseModal'
import { useDeleteStateMutation } from '@/redux/api/utilsApi'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
interface stateType{
    id:string, 
    name:string
}
interface Props{
    handleToggler:()=>void,
    open:boolean,
    state: stateType | null
}
const DeleteStateModal = ({handleToggler, open, state}:Props) => {   
    const [deleteState, {isLoading}] = useDeleteStateMutation()

    const handleDeleteState = () =>{
        if(state?.id){
            deleteState({id: state?.id})
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
            toast.error('خطأ أثناء اختيار حالة القضية')
        }
    }
  return (
    <BaseModal
        handleToggler={handleToggler}
        open={open}
    >
        <div className="w-[50vw] py-8">
            <p className='text-red-500'>هل أنت متأكد من حذف  حالة القضية <span className='font-semibold'>"{state?.name}"</span> ؟</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleDeleteState} variant='red' title={'حذف'} icon={<FaTrash />} isLoading={isLoading} />
            <Button 
                className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
                onClick={handleToggler}
                isLoading={false}
                title='إلغاء'
                variant='secondary'
            />
      </div>
    </BaseModal>
  )
}

export default DeleteStateModal
