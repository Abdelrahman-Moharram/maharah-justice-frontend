import Button from '@/Components/Common/Button'
import { Input } from '@/Components/Forms'
import { useLitigationTypes } from '@/Components/Hooks/Utils/useLitigitionTypes'
import BaseModal from '@/Components/Modals/BaseModal'
import { useAddLitigationTypeMutation, useEditLitigationTypeMutation } from '@/redux/api/utilsApi'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface litigationTypeType{
    id?:string,
    name:string
}
interface Props{
    handleToggler:()=>void,
    open:boolean,
    oldLitigationType?: litigationTypeType|null
}

const LitigationTypeFormModal = ({handleToggler, open, oldLitigationType}:Props) => {    
    const [addLitigationType, {isLoading}] = useAddLitigationTypeMutation()
    const [editLitigationType, {isLoading:editLoading}] = useEditLitigationTypeMutation()
    const {
        litigationType,
        error,
        onChange,
        setError,
        setLitigationType
    } = useLitigationTypes()
    useEffect(()=>{
        if(!open){
            setLitigationType({id:'', name:''})
        }
    }, [open])
    
    useEffect(()=>{
        if(oldLitigationType)
            setLitigationType(oldLitigationType)
    }, [oldLitigationType?.id])
    
    const handleLitigationType = () =>{
        if(error){
            toast.error('برجاء إدخال بيانات نوع القضية بشكل صحيح')                
            return
        }
        if(litigationType?.id){
            editLitigationType({id:litigationType?.id, name:litigationType.name})
            .unwrap()
            .then(res=>{
                handleToggler()
                setLitigationType({id:'', name:''})                
                toast.success(res?.message)        
            }).catch(err=>{
                
                const error = err?.data?.errors
                if(!error)
                    toast.error('حدث خطأ ما برجاء المحاولة لاحقا')        
                else        
                    setError(error)
            })

        }else{
            addLitigationType({name:litigationType.name})
            .unwrap()
            .then(res=>{
                handleToggler()
                setLitigationType({id:'', name:''})
                toast.success(res?.message)
            }).catch(err=>{
                
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
                    label='اسم نوع القضية'
                    labelId='litigationType'
                    type='text'
                    value={litigationType.name}
                    onChange={e=>onChange(e, {regex:{value:'^[ء-ي][ء-ي ]{2,}$', message:"اسم نوع القضية يجب ان يحتوي على الاقل من 3 أحرف باللغة العربية"}})}
                    errors={error}
                    placeholder='اسم نوع القضية'
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleLitigationType} variant='primary' title={'حفظ'} isLoading={isLoading||editLoading} />
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

export default LitigationTypeFormModal
