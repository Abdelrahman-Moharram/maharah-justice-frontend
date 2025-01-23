'use client'
import Paginition from '@/Components/Lists/Paginition'
import DataTable from '@/Components/Tables/DataTable'
import TableSettings from '@/Components/Tables/TableSettings'
import { to_int_or_default } from '@/Components/utils/helper'
import { useExportConsultationsListMutation, useGetConsultationsListQuery } from '@/redux/api/sessionsApi'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { TbMessageReply } from "react-icons/tb";
import ReplyConsultationOverlay from './_Components/ReplyConsultationOverlay'
import { BsEye } from 'react-icons/bs'

const page = () => {
  const [open, setOpen]           = useState(false)
  const [consultId, setConsultId] = useState('')
  const searchParams      = useSearchParams()
  let size                = to_int_or_default(searchParams.get("size"))
  let page                = to_int_or_default(searchParams.get("page"))
  const filter            = searchParams.get('filter') || ''
  const search            = searchParams.get('search') || ''

  const {data, isLoading} = useGetConsultationsListQuery({page, size:size||10, search:search, filter}, {skipPollingIfUnfocused:true})  

  const [ExportConsultations] = useExportConsultationsListMutation() 
  

  const handleOpen = () =>{
    setOpen(!open)
  }

  const exportData = (type:string) => {
    let ext = ''
    if (type === 'pdf')
      ext = 'pdf'
    else if (type === 'excel')
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
      
      <button onClick={
        ()=>{
          setConsultId(row?.id)
          handleOpen()
        }} 
        className=' text-green-600 text-lg transition-all rounded-full' 
      > 
        {
          row?.can_reply?
            <TbMessageReply />
          :
            <BsEye />
        }  
      </button>
      {/* <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/consulations/${row?.id}/edit`}><TbMessageReply /></Link> */}
    </div>
  )
  
  
  return (
    <>
      {
        consultId?
          <ReplyConsultationOverlay 
            handleOpen={handleOpen}
            open={open}
            consult_id={consultId}
          />
        :null
      }
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
            fnKeys={['id', 'can_reply', 'is_sender', 'can_approve']}
          />
        </div>
        <div className='flex justify-center my-10 font-extrabold'>
          <Paginition
            totalPages={data?.total_pages}
          /> 
        </div>
      </div>
    </>
  )
}

export default page
