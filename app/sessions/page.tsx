'use client'
import React, { useCallback, useState } from 'react'
import TableSettings from '@/Components/Tables/TableSettings'
import DataTable from '@/Components/Tables/DataTable'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useGetSessionsExcelMutation, useGetSessionsListQuery } from '@/redux/api/sessionsApi'
import { BiEdit } from 'react-icons/bi'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'
import { BsEye } from 'react-icons/bs'
import Paginition from '@/Components/Lists/Paginition'
import CaseDetailsOverLay from '../cases/_Components/CaseDetailsOverLay'


const to_int_or_default = (val:string|null)=>{
    try{
        if(val)
            return parseInt(val)
    }
    catch{
    }
    return null
}
  
const page = () => {
    const [showSessionDetails, setShowSessionDetails] = useState<Boolean>(false)
    const [detailsSessionNumber, setDetailsSessionNumber] = useState<string>('')
    const searchParams = useSearchParams()
    let size = to_int_or_default(searchParams.get("size"))
    let page = to_int_or_default(searchParams.get("page"))


    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
    
          return params.toString()
        },
        [searchParams]
    )
    const router = useRouter()
    const pathname = usePathname()
    const search = searchParams.get('search')
    if(!size){
        router.push(pathname + '?' + createQueryString('size', "10"))
    }
    if(!page){
        page = 1
        router.push(pathname + '?' + createQueryString('page', "1"))
    }

    const {data, isLoading} = useGetSessionsListQuery({page:page-1, size:size??10, search:search}, {skipPollingIfUnfocused:true})  
    const [ExportSessions] = useGetSessionsExcelMutation() 
    const options = (id:string)=>(
        <div className='flex gap-4 items-start'>
          <button onClick={()=>{
              setDetailsSessionNumber(id)
              handleDetailsModel()
            }} className=' text-blue-600 text-lg transition-all rounded-full' ><BsEye /></button>
          <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/sessions/${id}/edit`}><BiEdit /></Link>
          <button 
            className=' text-lg text-red-500 rounded-full'><FaTrash /></button>
        </div>
      )
    const downloadFile = () => {
      ExportSessions({})
      .unwrap()
      .then(res=>{        
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'الجلسات.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
    };
    const handleDetailsModel = () =>{
      setShowSessionDetails(!showSessionDetails)
    }
    console.log(data);
    
  return (
    <div>
      <CaseDetailsOverLay 
          case_number={detailsSessionNumber}
          handleToggler={handleDetailsModel}
          open={showSessionDetails}
        />
        <div className='min-h-[300px] p-5 space-y-4'>
          <TableSettings 
            excel={downloadFile}
          />
          <div className="p-4">
            <DataTable 
              data={data?.sessions}
              isLoading={isLoading}        
              options={options}
              isOptions={true}
              emptyLinkHref='/sessions'
              emptyText='صفحة جميع الجلسات'
            />
          </div>
          <div className='flex justify-center my-10 font-extrabold'>
              {
                data?.sessions.length?
                  <Paginition page={page} totalPages={data?.total_pages} />
                :null
              }
          </div>
        </div>
    </div>
  )
}

export default page
