import { TextArea } from '@/Components/Forms';
import BaseModal from '@/Components/Modals/BaseModal';
import React, { ChangeEvent, useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoClose } from 'react-icons/io5'
import AcceptRejectModal from './AcceptRejectModal';
import { ValidationsType } from '@/Components/Types/Others';
import { DefaultInputValidate } from '@/Components/Hooks/Common/useValidations';
import { useAcceptRejectConsultationMutation } from '@/redux/api/sessionsApi';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

interface managerCommentType{
    message: string,
    is_approved: boolean | null
}

const baseManager = {
    message:'',
    is_approved:null
}
const ApproveReject = ({consult_id}:{consult_id:string}) => {
    const [open, setOpen]       = useState(false)
    const [errors, setErrors]   = useState<any>(null)
    const [managerComment, setManagerComment] = useState<managerCommentType>(baseManager)
    const [acceptRejectConsultation, {isLoading}] = useAcceptRejectConsultationMutation()

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setErrors({...errors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setManagerComment({ ...managerComment, [name]: value });
    };
    const handleModal = () =>{
        setOpen(!open)
    }
    const submit = () =>{
        const form = new FormData()
        form.append('is_approved', String(managerComment.is_approved? 1 : 0))
        form.append('message', managerComment.message)

        if(consult_id){
            acceptRejectConsultation({consult_id, form})
                .unwrap()
                .then(res=>{
                    toast.success(res?.message)
                    handleModal()
                })
                .catch((err:any)=>{     
                    console.log(err);
                    // if(err.data.errors)
                    //     setFormErrors(err.data.errors)
                    if(err.data.message)
                        toast.error(err.data.message)
    
                    handleModal()
                })
        }
    }
  return (
    <>
        <AcceptRejectModal
            handleModal={handleModal}
            managerComment={managerComment}
            onChange={onChange}
            open={open}      
            title={managerComment?.is_approved ? 'تعليق المدير':'سبب الرفض'}  
            saveAction={submit}
            isLoading={isLoading}
        />
        <div className="flex justify-between bg-card rounded-lg p-3 mx-4 items-start">
            <div className="font-extrabold h-full my-auto">
                رأي المدير
            </div>
            <div className="flex gap-4 ">
                
                <button
                    onClick={()=>{handleModal(); setManagerComment({is_approved:true, message:''})}}
                    className="inline-block rounded-full border border-green-600 bg-green-600 p-3 text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                    <span className="sr-only"> Accept </span>

                    <FaCheck className='text-xl' />
                </button>


                <button
                    onClick={()=>{handleModal(); setManagerComment({is_approved:false, message:''})}}
                    className="inline-block rounded-full border border-red-600 p-3 text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                >
                    <span className="sr-only"> Reject </span>
                    <IoClose className='text-xl font-extrabold' />
                </button>

            </div> 
        </div>
    </>
  )
}

export default ApproveReject
