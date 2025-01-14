import { SaveCancelButtonGroup } from '@/Components/Common'
import { TextArea } from '@/Components/Forms'
import BaseModal from '@/Components/Modals/BaseModal'
import { ValidationsType } from '@/Components/Types/Others'
import React, { ChangeEvent, useState } from 'react'
import { IoClose } from 'react-icons/io5'

interface managerCommentType{
    message: string,
    is_approved: boolean | null
}
interface Props{
    handleModal:()=>void,
    open:boolean,
    onChange:(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType )=>void,
    managerComment: managerCommentType
    title: string,
    saveAction:()=>void,
    isLoading:boolean
}
const AcceptRejectModal = ({handleModal, open, onChange, managerComment, title, saveAction, isLoading}:Props) => {
    
    
return (
    <BaseModal
        handleToggler={handleModal}
        open={open}
        containerClassName={`border-[3px] rounded-xl min-w-[80%] ${managerComment?.is_approved?'border-green-600':'border-red-600'}`}
    >
        <>
            <div className='p-3 space-y-8'>
                <div className='flex justify-between mb-4'>

                    <h4 className="text-[20px] font-bold">{title}</h4>
                    <button 
                        className="p-3 rounded-full hover:bg-gray-200 transition-all"
                        onClick={handleModal}
                        >
                        <IoClose />
                    </button>
                </div>

                <div className="min-w-[50%]">
                    <TextArea
                        label='تعليق المدير'
                        labelId='message'
                        onChange={onChange}
                        value={managerComment.message}
                        required
                        rows={12}
                        // errors={errors?.reply}
                    />
                </div>

                <SaveCancelButtonGroup 
                    cancelAction={handleModal}
                    cancelLoading={false}
                    // cancelTitle=''
                    saveAction={saveAction}
                    saveLoading={isLoading}

                />
            </div>
        </>
    </BaseModal>
)
}

export default AcceptRejectModal
