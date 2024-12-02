import Button from '@/Components/Common/Button'
import { Input } from '@/Components/Forms'
import { useCities } from '@/Components/Hooks/Utils/useCities'
import BaseModal from '@/Components/Modals/BaseModal'
import { useAddCityMutation, useEditCityMutation } from '@/redux/api/utilsApi'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface cityType{
    id?:string,
    name:string
}
interface Props{
    handleToggler:()=>void,
    open:boolean,
    oldCity?: cityType|null
}

const CityFormModal = ({handleToggler, open, oldCity}:Props) => {    
    const [addCity, {isLoading}] = useAddCityMutation()
    const [editCity, {isLoading:editLoading}] = useEditCityMutation()
    const {
        city,
        error,
        onChange,
        setError,
        setCity
    } = useCities()
    useEffect(()=>{
        if(!open){
            setCity({id:'', name:''})
        }
    }, [open])
    
    useEffect(()=>{
        if(oldCity)
            setCity(oldCity)
    }, [oldCity?.id])
    
    const handleCity = () =>{
        if(error){
            toast.error('برجاء إدخال بيانات المدينة بشكل صحيح')                
            return
        }
        if(city?.id){
            editCity({id:city?.id, name:city.name})
            .unwrap()
            .then(res=>{
                handleToggler()
                setCity({id:'', name:''})                
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
            addCity({name:city.name})
            .unwrap()
            .then(res=>{
                handleToggler()
                setCity({id:'', name:''})
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
                    label='اسم المدينة'
                    labelId='city'
                    type='text'
                    value={city.name}
                    onChange={e=>onChange(e, {regex:{value:'^[ء-ي]{3,}$', message:"اسم المدينة يجب ان يحتوي على الاقل من 3 أحرف باللغة العربية"}})}
                    errors={error}
                    placeholder='اسم المدينة'
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleCity} className='bg-primary hover:bg-transparent hover:text-black border-primary text-white' title={'حفظ'} isLoading={isLoading||editLoading} />
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

export default CityFormModal
