'use client'
import React, { FormEvent, useState } from 'react'
import Filter from './Filter'
import DataTable from '@/Components/Tables/DataTable'
import Paginition from '@/Components/Lists/Paginition'
import { usePathname, useSearchParams } from 'next/navigation'
import { exportData, to_int_or_default } from '@/Components/utils/helper'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import { toast } from 'react-toastify'
import { useExportAllCasesReportMutation } from '@/redux/api/reportsApi'

interface Props{
  fnKeys:string[], // excluded cols in datatable
  exportFileName:string,
  filter:string, // represent the page we need to filter ex: ['closed-cases', 'judgement-cases', ...etc]
  base_url:string // represent the app route ex: ['cases/', 'sessions/', ...etc]
  amountKeys?:string[]
}
const DataSection = ({fnKeys, filter, base_url, exportFileName, amountKeys=['المبلغ']}:Props) => {
  const [data, setData] = useState<any>()
  const searchParams  = useSearchParams()
  const pathName = usePathname()
  let size            = to_int_or_default(searchParams.get("size"))
  let page            = to_int_or_default(searchParams.get("page"))
  let search          = searchParams.get("search") || ''
  let city            = searchParams.get("city") || ''
  let customer_type   = searchParams.get("customer_type") || ''
  let start_date      = searchParams.get("start_date") || ''
  let end_date        = searchParams.get("end_date") || ''
  const params = {
    base_url,
    size,
    page,
    search,
    start_date,
    end_date,
    filter,
    city,
    customer_type

  }
  const [getData, {isLoading}] = useExportAllCasesReportMutation() 
  const handleSearch = (e:FormEvent, filtersErrors:any, handleOpen:()=>void)=>{
    e.preventDefault()
    if(isErrorsList(filtersErrors)){
      toast.error('test')
      return
    }
    getData({...params, base_url})
      .unwrap()
      .then(res=>{
        setData(res)
        handleOpen()
      }).catch(err=>{
        
      })
  }
  
  return (
    <div>
      <Filter 
        excel={()=>exportData({ExportFun:getData, fileName:exportFileName, params:{...params, type:'excel' }, type:'excel'})}
        pdf={()=>exportData({ExportFun:getData, fileName:exportFileName, params:{...params, type:'pdf'}, type:'pdf'})}
        inputPlaceHolder='ابحث ببيانات القضية ...'
        handleSearch={handleSearch}
        isLoading={isLoading}
      />
      <div className="p-4">
        <DataTable
          data={data?.data}
          isLoading={isLoading}        
          emptyLinkHref={pathName}
          emptyText=''
          fnKeys={fnKeys}
          amounts={amountKeys}
        />
      </div>
      <div className='flex justify-center my-10 font-extrabold'>
        <Paginition
          totalPages={data?.total_pages}
        /> 
      </div>
    </div>
  )
}

export default DataSection




