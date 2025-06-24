import React, { useState } from 'react'
import { RiFileExcel2Line } from "react-icons/ri";
import { FiPrinter } from "react-icons/fi";
import { HijriDateInput } from '../Forms';
import { hijriDateRegex } from '../Hooks/Common/validationsRegexRepo';
import { FaFilter } from 'react-icons/fa';
import { useFilters } from '../Hooks/Others/filters';

interface Props{
    excel:()=>void
    pdf:()=>void,
    inputPlaceHolder?:string
}
const TableSettings = ({excel, pdf, inputPlaceHolder}:Props) => {
  const [open, setOpen] = useState(false)
  const {
    filters,
    changeDate,
    onChange
  } = useFilters()

  const handleOpen = () =>{
    setOpen(!open)
  }
  return (
    <div className='grid grid-cols-2 p-3 bg-card text-color rounded-md'>
        <div className="col-span-1">
          <input 
            className='w-full py-2 px-5 bg-container outline-hidden border-none shadow-md rounded-lg'
            placeholder={inputPlaceHolder || 'ابحث ...'}
            value={filters.search}
            onChange={e=>onChange(e)}
            name='search'
          />
        </div>
        
        <div className="flex gap-3 justify-end items-center">
          <button className='flex items-center gap-3 bg-container py-1 px-2 shadow-md shadow-color/20 rounded-md' onClick={handleOpen}>فلترة<FaFilter /></button>
          <button className='flex items-center gap-3 bg-container py-1 px-2 shadow-md shadow-color/20 rounded-md' onClick={pdf}>طباعة<FiPrinter /></button>
          <button className='flex items-center gap-3 bg-container py-1 px-2 shadow-md shadow-color/20 rounded-md' onClick={excel}>إكسل<RiFileExcel2Line /></button>
        </div>

        <div className={` bg-card text-color rounded-md col-span-2 overflow-hidden transition-all duration-700 ease h-fit ${open?'max-h-[500px]':'max-h-[0px]'}`}>
          <div className="py-3">
            
            <div className={`bg-container shadow-md shadow-color/20 rounded-md p-4 flex`}>
              <div className="w-[25%] px-1">
                <HijriDateInput
                  labelId='start_date'
                  label='تاريخ البداية'
                  onChange={e=>changeDate(e, 'start_date',  {regex:{value:hijriDateRegex, message:'التاريخ غير صحيح'}})}
                  value={filters.start_date}
                />
              </div>
              <div className="w-[25%] px-1">
                <HijriDateInput
                  labelId='end_date'
                  label='تاريخ النهاية'
                  onChange={e=>changeDate(e, 'end_date',  {regex:{value:hijriDateRegex, message:'التاريخ غير صحيح'}})}
                  value={filters.end_date}
                />
              </div>
            </div>
            {/* <div className="mt-3">
              <SaveCancelButtonGroup
                cancelAction={()=>{}}
              />
            </div> */}
          </div>
        </div>
    </div>
  )
}

export default TableSettings
