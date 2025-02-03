'use client'
import DataTable from '@/Components/Tables/DataTable'
import TableSettings from '@/Components/Tables/TableSettings'
import { exportData, to_int_or_default } from '@/Components/utils/helper'
import { useExportExecutionsMutation, useGetExecutionsListQuery } from '@/redux/api/JudgementsApi'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

const DataSection = () => {
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
    size,
    page,
    search,
    start_date,
    end_date,
    city,
    customer_type,
    exec_type:searchParams.get('exec_type') || ''
  }

  const {data, isLoading} = useGetExecutionsListQuery(params)
  const [exportFunc] = useExportExecutionsMutation()

  return (
    <div>
      <TableSettings 
        excel={()=>{exportData({ExportFun:exportFunc, fileName:'التنفيذات', params, type:'excel'})}}
        pdf={()=>{exportData({ExportFun:exportFunc, fileName:'التنفيذات', params, type:'pdf'})}}
      />
      <div className="p-4 mt-2">
        <DataTable
          data={data?.executions}
          isLoading={isLoading}        
          emptyLinkHref={pathName}
          emptyText=''
          fnKeys={[]}
          amounts={['المبلغ']}
        />
      </div>
      {/* <div className='flex justify-center my-10 font-extrabold'>
        <Paginition
          totalPages={data?.total_pages}
        /> 
      </div> */}
    </div>
  )
}

export default DataSection
