'use client'
import React, { useState } from 'react'
import { useFilters } from './useFilters'
import { HijriDateInput, SelectInput } from '@/Components/Forms'
import { hijriDateRegex } from '@/Components/Hooks/Common/validationsRegexRepo'
import { FaFilter } from 'react-icons/fa'
import { FiPrinter } from 'react-icons/fi'
import { RiFileExcel2Line } from 'react-icons/ri'
import { baseType } from '@/Components/Types/Others'
import { usePathname } from 'next/navigation'
import { getPageFilter } from './helper'

interface Props{
    excel:()=>void
    pdf:()=>void,
    inputPlaceHolder?:string,
}
const Filter = ({pdf, excel, inputPlaceHolder}:Props) => {
  const path = usePathname()
  const pageFilters:string[] = getPageFilter(path)
  
  const [open, setOpen] = useState(false)
  const {
    filters,
    filtersErrors,
    dropdowns,
    changeDate,
    onChange,
    selectChange,
  } = useFilters()

  const handleOpen = () =>{
    setOpen(!open)
  }
  
  return (
    <div className='grid grid-cols-2 gap-2 p-3 bg-card text-color rounded-md'>
      <div className="col-span-1">
        <input 
          className='w-full py-2 px-5 bg-container outline-none border-none shadow-md rounded-lg'
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

      {
        pageFilters?.includes('date')?
          <div className={` bg-card text-color h-auto rounded-2xl col-span-1 overflow-hidden transition-all duration-700 ease ${open?'max-h-[500px]':'max-h-[0px]'}`}>
            <div className="py-3"> 
              <div className={`bg-container shadow-md shadow-color/20 rounded-md p-4 flex`}>
                <div className="w-[50%] px-1">
                  <HijriDateInput
                    labelId='start_date'
                    label='تاريخ البداية'
                    onChange={e=>changeDate(e, 'start_date',  {regex:{value:hijriDateRegex, message:'التاريخ غير صحيح'}})}
                    value={filters.start_date}
                  />
                </div>
                <div className="w-[50%] px-1">
                  <HijriDateInput
                    labelId='end_date'
                    label='تاريخ النهاية'
                    onChange={e=>changeDate(e, 'end_date',  {regex:{value:hijriDateRegex, message:'التاريخ غير صحيح'}})}
                    value={filters.end_date}
                  />
                </div>
              </div>
            </div>
          </div>
        :null
      }

      {
        pageFilters?.includes('city')?
          <div className={` bg-card text-color h-auto rounded-2xl col-span-1 overflow-hidden transition-all duration-700 ease ${open?'max-h-[500px]':'max-h-[0px]'}`}>
            
            <div className="py-3"> 
              <div className={`bg-container shadow-md shadow-color/20 rounded-md p-4 flex`}>
                <div className="w-[100%] px-1">
                  <SelectInput
                    label='المدينة'
                    labelId='city'
                    onChange={selectChange}
                    value={filters.city}
                    errors={filtersErrors?.city}
                    options={dropdowns?.cities.map((city:baseType)=>({label:city?.name, value:city?.name}))}
                  />
                </div>
              </div>
            </div>
          </div>
        :null
      }
      {
        pageFilters?.includes('customer_type')?
          <div className={` bg-card text-color h-auto rounded-2xl col-span-1 overflow-hidden transition-all duration-700 ease ${open?'max-h-[500px]':'max-h-[0px]'}`}>
            <div className="py-3"> 
              <div className={`bg-container shadow-md shadow-color/20 rounded-md p-4 flex`}>
                <div className="w-[100%] px-1">
                  <SelectInput
                    label='نوع العميل'
                    labelId='customer_type'
                    onChange={selectChange}
                    value={filters.customer_type}
                    errors={filtersErrors?.customer_type}
                    options={dropdowns?.customer_types.map((city:baseType)=>({label:city?.name, value:city?.name}))}
                  />
                </div>

              </div>
            </div>

          </div>
        :null
      }
        

        
        
        
    </div>
  )
}

export default Filter
