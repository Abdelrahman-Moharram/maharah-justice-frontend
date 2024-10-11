'use client'
import Paginition from '@/Components/Lists/Paginition'
import DataTable from '@/Components/Tables/DataTable'
import TableSettings from '@/Components/Tables/TableSettings'
import { useGetCasesListQuery, useExportCasesExcelMutation } from '@/redux/api/casesApi'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import { FaTrash } from "react-icons/fa";

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
    const filter = searchParams.get('filter')
    if(!size){
        router.push(pathname + '?' + createQueryString('size', "10"))
    }
    if(!page){
        page = 1
        router.push(pathname + '?' + createQueryString('page', "1"))
    }

    const {data, isLoading} = useGetCasesListQuery({page:page-1, size:size??10, filter:filter}, {skipPollingIfUnfocused:true})  
    const [ExportCases] = useExportCasesExcelMutation() 
    
    const downloadFile = () => {
      ExportCases(undefined)
      .unwrap()
      .then(res=>{        
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'القضايا.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
    };
     
    const options = (id:string)=>(
      <div className='flex gap-2 items-start'>
        <Link className='p-3 bg-container hover:bg-card transition-all shadow-md rounded-full' href={`/cases/${id}`}><BsEye /></Link>
        <Link className='p-3 bg-container hover:bg-card transition-all shadow-md rounded-full' href={`/cases/${id}/edit`}><BiEdit /></Link>
        <Link className='p-3 bg-container text-red-500 hover:bg-red-100 shadow-md rounded-full' href={`/cases/${id}/delete`}><FaTrash /></Link>
      </div>
    )
    return (
      <div className='min-h-[300px] p-5 space-y-4'>
        <TableSettings 
          excel={downloadFile}
        />
        <div className="p-4">
          <DataTable 
            data={data?.cases}
            isLoading={isLoading}        
            options={options}
            isOptions={true}
          />
        </div>
        <div className='flex justify-center my-10 font-extrabold'>
            <Paginition page={page} totalPages={data?.total_pages} />
        </div>
      </div>
    )
}

export default page
