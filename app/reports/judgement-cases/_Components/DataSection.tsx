'use client'
import React from 'react'
import Filter from '../../_Components/Filter'
import { useGetAllCasesReportQuery, useExportAllCasesReportMutation } from '@/redux/api/casesApi'
import DataTable from '@/Components/Tables/DataTable'
import Paginition from '@/Components/Lists/Paginition'
import { useSearchParams } from 'next/navigation'
import { exportData, to_int_or_default } from '@/Components/utils/helper'

const DataSection = () => {
  const searchParams  = useSearchParams()
  let size            = to_int_or_default(searchParams.get("size"))
  let page            = to_int_or_default(searchParams.get("page"))
  let search          = searchParams.get("search") || ''
  let start_date      = searchParams.get("start_date") || ''
  let end_date        = searchParams.get("end_date") || ''
  const params = {
    size,
    page,
    search,
    start_date,
    end_date,
    filter:'finished'
  }
  const [ExportData] = useExportAllCasesReportMutation() 
  const {data, isLoading} = useGetAllCasesReportQuery({...params})
  return (
    <div>
      <Filter 
        excel={()=>exportData({ExportFun:ExportData, fileName:'القضايا المغلقة', params:{...params, type:'excel'}, type:'excel'})}
        pdf={()=>exportData({ExportFun:ExportData, fileName:'القضايا المغلقة', params:{...params, type:'pdf'}, type:'pdf'})}
        inputPlaceHolder='ابحث ببيانات القضية ...'
      />
      <div className="p-4">
        <DataTable
          data={data?.cases}
          isLoading={isLoading}        
          emptyLinkHref='/reports/cases'
          emptyText=''
          fnKeys={['id']}
          amounts={['المبلغ']}
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




