'use client'
import Button from '@/Components/Common/Button'
import BaseModal from '@/Components/Modals/BaseModal'
import { useDeleteCityMutation } from '@/redux/api/utilsApi'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
interface cityType{
    id:string, 
    name:string
}
interface Props{
    handleToggler:()=>void,
    open:boolean,
    city: cityType | null
}
const DeleteCityModal = ({handleToggler, open, city}:Props) => {   
    const [deleteCity, {isLoading}] = useDeleteCityMutation()

    const handleDeleteCity = () =>{
        if(city?.id){
            deleteCity({id: city?.id})
                .then(res=>{
                    handleToggler()
                })
                .catch(err=>{
                    console.log(err);
                })
        }
        else{
            toast.error('خطأ أثناء اختيار المدينة')
        }
    }
  return (
    <BaseModal
        handleToggler={handleToggler}
        open={open}
    >
        <div className="w-[50vw] py-8">
            <p className='text-red-500'>هل أنت متأكد من حذف  مدينة <span className='font-semibold'>"{city?.name}"</span> ؟</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <Button 
                onClick={handleDeleteCity} 
                title={'حذف'} 
                icon={<FaTrash />} 
                isLoading={isLoading} 
                variant='red'
            />

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

export default DeleteCityModal
