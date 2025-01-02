import Button from '@/Components/Common/Button';
import { TextArea } from '@/Components/Forms'
import { DefaultInputValidate } from '@/Components/Hooks/Common/useValidations';
import OverLayFuncArea from '@/Components/Modals/OverLayFuncArea';
import { ValidationsType } from '@/Components/Types/Others';
import { useReplayConsultationMutation } from '@/redux/api/sessionsApi';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify';

const ReplayForm = ({consult_id, open, handleOpen}:{consult_id:string, handleOpen:()=>void, open:boolean}) => {
    const [replayConsultation] = useReplayConsultationMutation()
    const [errors, setErrors] = useState<any>(null)
    const [replay, setReplay] = useState({
        replay:'',
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setErrors({...errors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setReplay({ ...replay, [name]: value });
    }; 
    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault()
        const form = new FormData()
        form.append('replay', replay?.replay)

        replayConsultation({consult_id, form})
            .then((res:any)=>{
                console.log("res>> ",res);
                if (res?.error){
                    if(res?.error?.data && res?.error?.data?.error)
                        toast.error(res?.error?.data?.error)
    
                    if (res?.error?.data?.errors){
                        setErrors(res?.error?.data?.errors)
                    }
                }else{
                    toast.success(res?.data?.message || 'تم الرد بنجاح')
                    handleOpen()
                }
            }).catch(err=>{
                console.log(err);
                
                if(err.data?.error)
                    toast.error(err.data?.error)

                if (err?.data?.errors){
                    setErrors(err?.data?.errors)
                }
            })
        
    }
  return (
    <form onSubmit={handleSubmit}>
      <TextArea 
        label='الرد'
        labelId='replay'
        onChange={onChange}
        value={replay?.replay}
        // required
        errors={errors?.replay}
      />
        <OverLayFuncArea
            open={open}
        >
            <Button submit className='bg-primary hover:bg-transparent border-primary' title={'حفظ'} isLoading={false} />
            <Button 
                onClick={handleOpen}
                className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
                title={'إلغاء'} 
                isLoading={false}
            />
        </OverLayFuncArea>
    </form>
  )
}

export default ReplayForm
