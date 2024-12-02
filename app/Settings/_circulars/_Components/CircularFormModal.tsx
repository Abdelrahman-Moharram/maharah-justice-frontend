import Button from '@/Components/Common/Button'
import { Input } from '@/Components/Forms'
import { useCirculars } from '@/Components/Hooks/Utils/useCirculars'
import BaseModal from '@/Components/Modals/BaseModal'
import { useAddCircularMutation, useEditCircularMutation } from '@/redux/api/utilsApi'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface circularType{
    id?:string,
    name:string
}
interface Props{
    handleToggler:()=>void,
    open:boolean,
    oldCircular?: circularType|null
}

const CircularFormModal = ({handleToggler, open, oldCircular}:Props) => {    
    const [addCircular, {isLoading}] = useAddCircularMutation()
    const [editCircular, {isLoading:editLoading}] = useEditCircularMutation()
    const {
        circular,
        error,
        onChange,
        setError,
        setCircular
    } = useCirculars()
    useEffect(()=>{
        if(!open){
            setCircular({id:'', name:''})
        }
    }, [open])
    
    useEffect(()=>{
        if(oldCircular)
            setCircular(oldCircular)
    }, [oldCircular?.id])
    
    const handleCircular = () =>{
        if(error){
            toast.error('برجاء إدخال بيانات الدائرة بشكل صحيح')                
            return
        }
        if(circular?.id){
            editCircular({id:circular?.id, name:circular.name})
            .unwrap()
            .then(res=>{
                handleToggler()
                setCircular({id:'', name:''})                
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
            addCircular({name:circular.name})
            .unwrap()
            .then(res=>{
                handleToggler()
                setCircular({id:'', name:''})
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
                    label='اسم الدائرة'
                    labelId='circular'
                    type='text'
                    value={circular.name}
                    onChange={e=>onChange(e, {regex:{value:'^[ء-ي][ء-ي ]{2,}$', message:"اسم الدائرة يجب ان يحتوي على الاقل من 3 أحرف باللغة العربية"}})}
                    errors={error}
                    placeholder='اسم الدائرة'
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleCircular} className='bg-primary hover:bg-transparent hover:text-black border-primary text-white' title={'حفظ'} isLoading={isLoading||editLoading} />
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

export default CircularFormModal
