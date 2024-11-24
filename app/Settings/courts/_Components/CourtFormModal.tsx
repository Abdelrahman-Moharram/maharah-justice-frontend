import Button from '@/Components/Common/Button'
import { Input } from '@/Components/Forms'
import { useCourts } from '@/Components/Hooks/utils'
import BaseModal from '@/Components/Modals/BaseModal'
import { useAddCourtMutation, useEditCourtMutation } from '@/redux/api/utilsApi'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface courtType{
    id?:string,
    name:string
}
interface Props{
    handleToggler:()=>void,
    open:boolean,
    oldCourt?: courtType|null
}

const CourtFormModal = ({handleToggler, open, oldCourt}:Props) => {    
    const [addCourt, {isLoading}] = useAddCourtMutation()
    const [editCourt, {isLoading:editLoading}] = useEditCourtMutation()
    const {
        court,
        error,
        onChange,
        setError,
        setCourt
    } = useCourts()
    useEffect(()=>{
        if(!open){
            setCourt({id:'', name:''})
        }
    }, [open])
    
    useEffect(()=>{
        if(oldCourt)
            setCourt(oldCourt)
    }, [oldCourt?.id])
    
    const handleCourt = () =>{
        if(error){
            toast.error('برجاء إدخال بيانات المحكمة بشكل صحيح')                
            return
        }
        if(court?.id){
            editCourt({id:court?.id, name:court.name})
            .unwrap()
            .then(res=>{
                handleToggler()
                setCourt({id:'', name:''})                
                toast.success(res?.message)        
            }).catch(err=>{
                console.log(err);
                const error = err?.data?.errors
                if(!error)
                    toast.error('حدث خطأ ما برجاء المحاولة لاحقا')        
                else        
                    setError(error)
            })

        }else{
            addCourt({name:court.name})
            .unwrap()
            .then(res=>{
                handleToggler()
                setCourt({id:'', name:''})
                toast.success(res?.message)
            }).catch(err=>{
                console.log(err);
                const error = err?.data?.errors
                if(!error)
                    toast.error('حدث خطأ ما برجاء المحاولة لاحقا')        
                else        
                    setError(error)
            })
        }
    }
    return (
        <BaseModal
            handleToggler={handleToggler}
            open={open}
        >
            <div className="w-[50vw] my-8">
                <Input
                    label='اسم المحكمة'
                    labelId='court'
                    type='text'
                    value={court.name}
                    onChange={e=>onChange(e, {regex:{value:'^[ء-ي][ء-ي ]{2,}$', message:"اسم المحكمة يجب ان يحتوي على الاقل من 3 أحرف باللغة العربية"}})}
                    errors={error}
                    placeholder='اسم المحكمة'
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleCourt} className='bg-primary hover:bg-transparent hover:text-black border-primary text-white' title={'حفظ'} isLoading={isLoading||editLoading} />
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

export default CourtFormModal
