import DataTable from '@/Components/Tables/DataTable'
import Link from 'next/link'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaPlusCircle } from 'react-icons/fa'

const IncludedSessiosJudgements = ({data, case_number}:{data:any, case_number:string}) => {
  const startOptions = (row:any)=>(
    <div className='flex gap-4 items-start'>
      <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/cases/${case_number}/sessions/${row.id}/edit`}><BiEdit /></Link>
    </div>
  )
  const endOptions = (row:any)=>(
    <div className='flex gap-4 items-start'>
      <Link className='bg-primary h-fit p-2 rounded-md text-negitaive-color flex items-center gap-3' href={`/sessions/${row.session_id}/judgements/add`}>
        إضافة إعتراض
        <FaPlusCircle />
      </Link>
    </div>
  )
  
  return (
    <div className='rounded-md'>
      <DataTable 
        data={data}
        emptyLinkHref='#'
        emptyText='لا توجد جلسات لهذه القضية'
        isLoading={false}
        isOptions
        startOptions={startOptions}
        options={endOptions}
        fnKeys={['id', 'session_id']}
        optionsHeader='الإعتراضات'
      />
    </div>
  )
}

export default IncludedSessiosJudgements
