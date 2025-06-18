'use client'
import Paginition from '@/Components/Lists/Paginition'
import DataTable from '@/Components/Tables/DataTable'
import TableSettings from '@/Components/Tables/TableSettings'
import { useGetCasesListQuery, useExportCasesFileMutation } from '@/redux/api/casesApi'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import { FaTrash } from "react-icons/fa";
import CaseDetailsOverLay from './_Components/CaseDetailsOverLay'
import DeleteCaseModal from './_Components/DeleteCaseModal'
import { exportData, to_int_or_default } from '@/Components/utils/helper'
import { IsAllowedPermissionOrNull } from '@/Components/Guards/IsAllowedPermission'



const page = () => {
    const [showCaseDetails, setShowCaseDetails] = useState<boolean>(false)
    const [detailsCaseNumber, setDetailsCaseNumber] = useState<string>('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deletedCase, setDeleteCase] = useState<{case_number:string}>({case_number:''})

    const searchParams  = useSearchParams()
    let size            = to_int_or_default(searchParams.get("size"))
    let page            = to_int_or_default(searchParams.get("page"))
    let search          = searchParams.get("search") || ''
    let start_date      = searchParams.get("start_date") || ''
    let end_date        = searchParams.get("end_date") || ''


    
    const filter = searchParams.get('filter')

    const {data, isLoading} = useGetCasesListQuery({page, size:size??10, filter:filter, search, start_date, end_date}, {skipPollingIfUnfocused:true})  
    const [ExportCases] = useExportCasesFileMutation() 
    
    
    const handleDetailsModel = () =>{
      setShowCaseDetails(!showCaseDetails)
    }
    const handleDeleteModal = () =>{
      setDeleteModal(!deleteModal)
    }
    
    
     
    const options = (row:any)=>(
      <div className='flex gap-4 items-start'>
        <IsAllowedPermissionOrNull
          permission='permissions.cases.view'
        >
          <button onClick={()=>{
              setDetailsCaseNumber(row?.id)
              handleDetailsModel()
            }} className=' text-blue-600 text-lg transition-all rounded-full' ><BsEye /></button>
        </IsAllowedPermissionOrNull>
        
        <IsAllowedPermissionOrNull
          permission='permissions.cases.edit'
        >
          <Link target='_blank' className=' text-green-600 text-lg transition-all rounded-full' href={`/cases/${row?.id}/edit`}><BiEdit /></Link>
        </IsAllowedPermissionOrNull>
        <IsAllowedPermissionOrNull
          permission='permissions.cases.view'
        >
          <button 
            onClick={()=>{
              setDeleteCase({case_number:row?.id})
              handleDeleteModal()
            }} 
            className=' text-lg text-red-500 rounded-full'
          >
            <FaTrash />
          </button>
        </IsAllowedPermissionOrNull>
      </div>
    )
    
    return (
      <>
        <DeleteCaseModal 
          open={deleteModal}
          handleModal={handleDeleteModal}
          Case={deletedCase}
        />
        
        <CaseDetailsOverLay 
          case_number={detailsCaseNumber}
          handleToggler={handleDetailsModel}
          open={showCaseDetails}
        />
        <div className='min-h-[300px] space-y-4'>
          <TableSettings 
            excel={()=>exportData({ExportFun:ExportCases, fileName:'القضايا', params:{search:search, filter, start_date, end_date}, type:'excel'})}
            pdf={()=>exportData({ExportFun:ExportCases, fileName:'القضايا', params:{search:search, filter, start_date, end_date}, type:'pdf'})}
          />
          <div className="p-4">
            <DataTable 
              data={data?.cases}
              isLoading={isLoading}        
              startOptions={options}
              isOptions={true}
              emptyLinkHref='/cases'
              emptyText='صفحة القضايا الرئيسية'
              fnKeys={['id']}
              amounts={['المبلغ']}
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
