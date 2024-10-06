'use client'
import DataTable from '@/Components/Tables/DataTable'
import { useGetCasesListQuery, useExportCasesExcelQuery } from '@/redux/api/casesApi'
import Link from 'next/link'
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import { FaDeleteLeft } from 'react-icons/fa6'

const page = () => {
    const {data, isLoading} = useGetCasesListQuery({}, {skipPollingIfUnfocused:true})  
    const {data:excelFile, isLoading:loadingExcel} = useExportCasesExcelQuery({}, {skipPollingIfUnfocused:true}) 
    
    const downloadFile = (blob:File) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'القضايا.xlsx';  // File name
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
     
    const options = (id:string)=>(
      <div className='flex gap-2 items-start'>
        <Link href={`/cases/${id}`}><BsEye /></Link>
        <Link href={`/cases/${id}/edit`}><BiEdit /></Link>
        <Link href={`/cases/${id}/delete`}><FaDeleteLeft /></Link>
      </div>
    )
    return (
      <div className='min-h-[300px] p-5'>
        <button onClick={()=>downloadFile(excelFile)}>download</button>
        <DataTable 
          data={data?.cases}
          isLoading={isLoading}        
          options={options}
          isOptions={true}
        />
      </div>
    )
}

export default page
