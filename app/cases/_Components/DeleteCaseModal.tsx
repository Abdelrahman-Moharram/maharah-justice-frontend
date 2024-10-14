
import { ChangeEvent, useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import BaseModal from '@/Components/Modals/BaseModal';
import FloatingInput from '@/Components/Forms/FloatingInput';
import { Spinner } from '@/Components/Common';
interface Props{
    open: boolean;
    handleModal: ()=>void;
    Case: {
        case_number: string;
        // number: string;
    };
    formData:({case_number}:{case_number:string})=>void,
    isLoading:boolean
}
const DeleteCaseModal = ({handleModal, open, Case, formData, isLoading}:Props) => {
    const [caseNumber, setCaseNumber] = useState('')
    const handlecaseNumber = (e: ChangeEvent<HTMLInputElement>)=>{
        setCaseNumber(e.target.value)
    }
    
  return (
    <BaseModal
        open={open}
        handleClose={handleModal}
    >
       <div className="px-5 py-3 md:w-[700px] sm:w-[full]">
        <div>
            <p className='text-red-600 font-semibold'>
                هل أنت متأكد من حذف القضية رقم
                "
                <span className='font-bold'>
                    {Case?.case_number}
                </span>
                " ؟
            </p>
            <span className='text-md block text-gray-500 font-semibold mt-2 mb-5'>بحذف هذه الفضية سوف تقوم بحذف جميع الجلسات والأحكام و المرفقات الخاصة بها .</span>
            <span className='text-sm block text-gray-500 mt-2 mb-5'>الرجاء إدخال رقم القضية هنا</span>
            <div className="block mt-4">
                <FloatingInput
                    label='رقم القضية'
                    labelId='caseNumber'
                    onChange={handlecaseNumber}
                    value={caseNumber}
                    type='text'
                />
                <button
                    onClick={()=>formData({case_number:caseNumber})}
                    className="w-full shadow-md transition-all mt-3 flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 bg-red-100 hover:bg-red-500 hover:text-white"
                >
                    {
                        isLoading?
                            <Spinner sm />
                        :
                            <FaTrash />
                    }
                        حذف
                </button>
            </div>
        </div>
       </div>
    </BaseModal>
  )
}

export default DeleteCaseModal