import React from 'react'
import { RiFileExcel2Line } from "react-icons/ri";
import { FiPrinter } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";

interface Props{
    excel:()=>void
}
const TableSettings = ({excel}:Props) => {
  return (
    <div className='grid grid-cols-2 p-3 bg-card rounded-md'>
        <div className="col-span-1">
            <input 
                className='w-full py-2 px-5 bg-container outline-none border-none shadow-md rounded-lg'
                placeholder='ابحث برقم القضية ...'
            />
        </div>
        <div className="flex gap-3 justify-end items-center">
            <button className='flex items-center gap-3 bg-container py-1 px-2 shadow-md rounded-md'>فلترة<FaFilter /></button>
            <button className='flex items-center gap-3 bg-container py-1 px-2 shadow-md rounded-md'>طباعة<FiPrinter /></button>
            <button className='flex items-center gap-3 bg-container py-1 px-2 shadow-md rounded-md' onClick={excel}>إكسل<RiFileExcel2Line /></button>
        </div>
    </div>
  )
}

export default TableSettings
