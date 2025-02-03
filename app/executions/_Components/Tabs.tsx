'use client'
import Tabs from '@/Components/Common/Tabs'
import { useGetExecutionsTypesListQuery } from '@/redux/api/JudgementsApi'
import { useSearchParams } from 'next/navigation'
import React from 'react'


const ExecutionsTabs = () => {
  const {data, isLoading} = useGetExecutionsTypesListQuery(undefined)
  
  const searchParams  = useSearchParams()

  return (
    <div className=''>
      {
        !isLoading?
          <Tabs 
            tabs={data?.execution_types?.map((type:{id:string, name:string, key:string})=>({title:type.name, href:`/executions?exec_type=${type?.key}`}))}
            page={'/executions?exec_type='+searchParams.get('exec_type')}
          />
        :null
      }
    </div>
  )
}

export default ExecutionsTabs
