import BaseModal from '@/Components/Modals/BaseModal';
import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { IoClose } from 'react-icons/io5'

const ApproveReject = () => {
    const [open, setOpen] = useState(false)
    const handleModal = () =>{
        setOpen(!open)
    }
  return (
    <>
        <BaseModal
            handleToggler={handleModal}
            open={open}
            containerClassName='border-2 border-green-400'
        >
            test
        </BaseModal>
        <div className="flex justify-between bg-card rounded-lg p-3 mx-4 items-start">
            <div className="font-extrabold h-full my-auto">
                رأي المدير
            </div>
            <div className="flex gap-4 ">
                
                <button
                    onClick={handleModal}
                    className="inline-block rounded-full border border-green-600 bg-green-600 p-3 text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                    <span className="sr-only"> Accept </span>

                    <FaCheck className='text-xl' />
                </button>


                <button
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
