'use client'
import Paginition from '@/Components/Lists/Paginition'
import DataTable from '@/Components/Tables/DataTable'
import TableSettings from '@/Components/Tables/TableSettings'
import { to_int_or_default } from '@/Components/utils/helper'
import { useExportConsultationsListMutation, useGetConsultationsListQuery } from '@/redux/api/sessionsApi'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { TbMessageReply } from "react-icons/tb";

const page = () => {
  const searchParams      = useSearchParams()

  let size                = to_int_or_default(searchParams.get("size"))
  let page                = to_int_or_default(searchParams.get("page"))
  const filter            = searchParams.get('filter')
  const search            = searchParams.get('search') || ''

  const {data, isLoading} = useGetConsultationsListQuery({page, size:size||10, search:search, filter}, {skipPollingIfUnfocused:true})  

  const [ExportConsultations] = useExportConsultationsListMutation() 
  

  const exportData = (type:string) => {
    let ext = ''
    if (type==='pdf')
      ext = 'pdf'
    else if (type==='excel')
      ext = 'xlsx' 
    ExportConsultations({type, filter, search})
    .unwrap()
    .then(res=>{        
      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = `الإستشارات.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  };

  const options = (row:any) =>(
    <div className='flex gap-4 items-start'>
          {/* <button onClick={()=>{
              setDetailsSessionNumber(row?.id)
              handleDetailsModel()
            }} className=' text-blue-600 text-lg transition-all rounded-full' ><TbMessageReply />
          </button> */}
          <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/consulations/${row?.id}/edit`}><TbMessageReply /></Link>
          
    </div>
  )
  
  
  return (
    <div>
      <div className='min-h-[300px] p-5 space-y-4'>
        <TableSettings 
          excel={()=>exportData('excel')}
          pdf={()=>exportData('pdf')}
        />
        <div className="p-4">
          <DataTable 
            data={data?.cosultations}
            isLoading={isLoading}        
            options={options}
            isOptions={true}
            emptyLinkHref='/cosultations'
            emptyText='صفحة جميع الإستشارات'
            fnKeys={['id', 'can_replay', 'is_sender']}
          />
        </div>
        <div className='flex justify-center my-10 font-extrabold'>
          <Paginition
            totalPages={data?.total_pages}
          /> 
        </div>
      </div>
    </div>
  )
}

export default page
