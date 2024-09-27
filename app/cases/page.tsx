'use client'
import DataTable from '@/Components/Tables/DataTable'
import { useGetCasesListQuery } from '@/redux/api/casesApi'
import React from 'react'

const page = () => {
    const {data, isLoading} = useGetCasesListQuery(undefined)
    const cols_mapper = [
        {key:'case_number', label:'رقم القضية'},
        {key:'customer', label:'إسم العميل'},
        {key:'litigation_type', label:'نوع القضية'},
        {key:'court', label:'المحكمة'},
        {key:'city', label:'المدينة'},
        {key:'commercial_number', label:'رقم السجل التجاري'},
        {key:'date_ar', label:'تاريخ القضية'},
        {key:'state', label:'حالة القضية'},
        {key:'amount', label:'مبلغ القضية'},
      ]
  return (
    <div className='min-h-[300px] p-5'>
      <DataTable 
        data={data?.cases}
        cols_mapper={cols_mapper}
        isLoading={isLoading}        
      />
    </div>
  )
}

export default page
