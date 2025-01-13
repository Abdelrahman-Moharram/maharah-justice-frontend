import { TextArea } from '@/Components/Forms'
import { DefaultInputValidate } from '@/Components/Hooks/Common/useValidations';
import { ValidationsType } from '@/Components/Types/Others';
import { useReplyConsultationMutation } from '@/redux/api/sessionsApi';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ReplyForm = ({consult_id, open, action}:{consult_id:string, action:()=>void, open?:boolean}) => {
    const [replyConsultation] = useReplyConsultationMutation()
    const [errors, setErrors] = useState<any>(null)
    const [reply, setReply] = useState({
        reply:'',
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setErrors({...errors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setReply({ ...reply, [name]: value });
    }; 
    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault()
        const form = new FormData()
        form.append('reply', reply?.reply)
        setReply({...reply, reply:''})

        replyConsultation({consult_id, form})
            .then((res:any)=>{
                if (res?.error){
                    if(res?.error?.data && res?.error?.data?.error)
                        toast.error(res?.error?.data?.error)
                    if (res?.error?.data?.errors){
                        setErrors(res?.error?.data?.errors)
                    }
                }else{
                    toast.success(res?.data?.message || 'تم الرد بنجاح')
                    action()
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
    <form onSubmit={handleSubmit} className='mx-2 '>
        <div className="flex gap-2 relative">
            <button
                className="absolute bottom-1 outline-none inline-block rounded-full bg-gray-100 h-fit transition px-3 py-3 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring active:bg-primary/90"
            >
                <span className="sr-only"> Add </span>

                <FaArrowAltCircleUp className='text-xl' />
            </button>
            <div className="w-[calc(100%-60px)] rtl:mr-[60px] ltr:ml-[60px] float-start">
                <TextArea 
                    label=''
                    labelId='reply'
                    onChange={onChange}
                    value={reply?.reply}
                    required
                    rows={1}
                    errors={errors?.reply}
                />
            </div>

            
        </div>
    </form>
  )
}

export default ReplyForm
