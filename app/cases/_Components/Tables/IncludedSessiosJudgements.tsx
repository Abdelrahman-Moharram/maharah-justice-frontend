import DataTable from '@/Components/Tables/DataTable'
import Link from 'next/link'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaPlusCircle } from 'react-icons/fa'

const IncludedSessiosJudgements = ({data, case_number}:{data:any, case_number:string}) => {
  const startOptions = (row:any)=>(
    <div className='flex gap-4 items-start'>
      <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/judgements/${row.number}/edit`}><BiEdit /></Link>
    </div>
  )
  const endOptions = (row:any)=>{
    
    return (
      <div className='flex gap-4 items-start'>
        {
          row?.is_objectionable ?
            <Link className='bg-primary h-fit p-2 rounded-md text-negitaive-color flex items-center gap-3' href={`/judgements/${row.id}/appeal/add`}>
              إضافة إعتراض
              <FaPlusCircle />
            </Link>
          :null
        }
      </div>
    )
  }
  
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
        fnKeys={['id', 'session_id', 'is_aganist_company', 'is_objectionable', 'is_executable', 'number']}
        optionsHeader={'الإعتراضات'}
        amounts={['المبلغ']}
      />
    </div>
  )
}

export default IncludedSessiosJudgements
