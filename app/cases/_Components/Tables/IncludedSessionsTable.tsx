import DataTable from '@/Components/Tables/DataTable'
import Link from 'next/link'
import React from 'react'
import { BiEdit } from 'react-icons/bi'

interface sessionsType{
    id                       :string,
    'تاريخ الجلسة'          :string,
    'وقت الجلسة'            :string,
    'المحكمة'               :string,
    'المدينة'               :string,
    'المحامي'               :string,
    'المحامي البديل'       :string,
    'الضبط'                 :string,
    'طلبات الجلسة القادمة' :string,
    'الملاحظات'              :string,
    'أضيف بواسطة'           :string

}
const IncludedSessionsTable = ({sessions, case_number}:{sessions:sessionsType, case_number:string}) => {
  const options = (row:sessionsType)=>(
    <div className='flex gap-4 items-start'>
      <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/sessions/${row?.id}/edit`}><BiEdit /></Link>
    </div>
  )
  return (
    <div className='rounded-md'>
      <DataTable 
        data={sessions}
        emptyLinkHref='#'
        emptyText='لا توجد جلسات لهذه القضية'
        isLoading={false}
        isOptions
        startOptions={options}
        fnKeys={['id']}
      />
    </div>
  )
}

export default IncludedSessionsTable
