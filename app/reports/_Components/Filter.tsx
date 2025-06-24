'use client'
import React, { FormEvent, useState } from 'react'
import { useFilters } from './useFilters'
import { HijriDateInput, SelectInput } from '@/Components/Forms'
import { hijriDateRegex } from '@/Components/Hooks/Common/validationsRegexRepo'
import { FaFilter, FaSearch } from 'react-icons/fa'
import { FiPrinter } from 'react-icons/fi'
import { RiFileExcel2Line } from 'react-icons/ri'
import { baseType } from '@/Components/Types/Others'
import { usePathname } from 'next/navigation'
import { getPageFilter } from './helper'
import { Button } from '@/Components/Common'

interface Props{
    excel:()=>void
    pdf:()=>void,
    inputPlaceHolder?:string,
    handleSearch:(e:FormEvent, errors:any, handleOpen:()=>void)=>void,
    isLoading:boolean
}
const Filter = ({pdf, excel, inputPlaceHolder, handleSearch, isLoading}:Props) => {
  const path = usePathname()
  const pageFilters:string[] = getPageFilter(path)
  
  const [open, setOpen] = useState(true)
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
  <form onSubmit={e=>handleSearch(e, filtersErrors, handleOpen)} className='gap-2 p-5 bg-card text-color rounded-md'>
    <div className="flex justify-between ">

      <div className="w-[50%] pl-2">
        <input 
          className='w-full py-2 px-5 bg-container outline-hidden border-none shadow-md rounded-lg'
          placeholder={inputPlaceHolder || 'ابحث ...'}
          value={filters.search}
          onChange={e=>onChange(e)}
          name='search'
        />
      </div>
        
      <div className="flex gap-3 justify-end items-center">
        <button type='button' className='flex items-center gap-3 bg-container py-1 px-2 shadow-md shadow-color/20 rounded-md' onClick={handleOpen}>فلترة<FaFilter /></button>
        <button type='button' className='flex items-center gap-3 bg-container py-1 px-2 shadow-md shadow-color/20 rounded-md' onClick={pdf}>طباعة<FiPrinter /></button>
        <button type='button' className='flex items-center gap-3 bg-container py-1 px-2 shadow-md shadow-color/20 rounded-md' onClick={excel}>إكسل<RiFileExcel2Line /></button>
      </div>
    </div>

    <div className={` bg-card text-color rounded-2xl overflow-hidden transition-all duration-500 ease ${open?'max-h-[500px]':'max-h-[0px]'}`}>
      <div className="grid grid-cols-2 gap-4 ">
        {
          pageFilters?.includes('date')?
              <div className="py-3 "> 
                <div className={`bg-container shadow-md shadow-color/20 rounded-md p-4 flex`}>
                  <div className="w-[50%] px-1">
                    <HijriDateInput
                      labelId='start_date'
                      label='تاريخ البداية'
                      onChange={e=>changeDate(e, 'start_date',  {regex:{value:hijriDateRegex, message:'التاريخ غير صحيح'}})}
                      value={filters.start_date}
                      errors={filtersErrors.start_date}
                    />
                  </div>
                  <div className="w-[50%] px-1">
                    <HijriDateInput
                      labelId='end_date'
                      label='تاريخ النهاية'
                      onChange={e=>changeDate(e, 'end_date',  {regex:{value:hijriDateRegex, message:'التاريخ غير صحيح'}})}
                      value={filters.end_date}
                      errors={filtersErrors.end_date}
                      required
                    />
                  </div>
                </div>
              </div>
          :null
        }
        {
          pageFilters?.includes('city')?
            <div className="py-3 "> 
              <div className={`bg-container shadow-md shadow-color/20 rounded-md p-4 flex`}>
                <div className="w-full px-1">
                  <SelectInput
                    label='المدينة'
                    labelId='city'
                    onChange={selectChange}
                    value={filters.city}
                    // required
                    errors={filtersErrors?.city}
                    options={dropdowns?.cities.map((city:baseType)=>({label:city?.name, value:city?.name}))}
                  />
                </div>
              </div>
            </div>

            :null
          }

          {
            pageFilters?.includes('customer_type')?
                <div className="py-3 "> 
                  <div className={`bg-container shadow-md shadow-color/20 rounded-md p-4 flex`}>
                    <div className="w-full px-1">
                      <SelectInput
                        label='نوع العميل'
                        labelId='customer_type'
                        onChange={selectChange}
                        required
                        value={filters.customer_type}
                        errors={filtersErrors?.customer_type}
                        options={dropdowns?.customer_types.map((city:baseType)=>({label:city?.name, value:city?.name}))}
                      />
                    </div>

                  </div>
                </div>

            :null
          }
      </div>
          
      <Button
        isLoading={isLoading}
        title='بحث'
        icon={<FaSearch />}
        submit
        variant='primary'
      />
    </div>
        

        
    </form>
  )
}

export default Filter
