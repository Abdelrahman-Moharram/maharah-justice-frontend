'use client'
import DataTable from '@/Components/Tables/DataTable'
import { useGetCasesListQuery } from '@/redux/api/casesApi'
import React from 'react'

const page = () => {
    const {data, isLoading} = useGetCasesListQuery({}, {skipPollingIfUnfocused:true})    
    return (
      <div className='min-h-[300px] p-5'>
        <DataTable 
          data={data?.cases}
          // cols_mapper={cols_mapper}
          isLoading={isLoading}        
        />
      </div>
    )
}

export default page
