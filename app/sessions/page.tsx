'use client'
import React, { useCallback, useState } from 'react'
import TableSettings from '@/Components/Tables/TableSettings'
import DataTable from '@/Components/Tables/DataTable'
import { useSearchParams } from 'next/navigation'
import { useDeleteSessionMutation, useGetSessionsExcelMutation, useGetSessionsListQuery } from '@/redux/api/sessionsApi'
import { BiEdit } from 'react-icons/bi'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'
import { BsEye } from 'react-icons/bs'
import Paginition from '@/Components/Lists/Paginition'
import CaseDetailsOverLay from '../cases/_Components/CaseDetailsOverLay'
import DeleteModal from '@/Components/Modals/DeleteModal'
import { toast } from 'react-toastify'
import { exportData, to_int_or_default } from '@/Components/utils/helper'
import { TbMessageReply } from 'react-icons/tb'
import AddConsultationModal from '../consultations/_Components/AddConsultationModal'


 
const page = () => {
    const searchParams  = useSearchParams()
    const filter        = searchParams.get('filter')
    let size            = to_int_or_default(searchParams.get("size"))
    let page            = to_int_or_default(searchParams.get("page"))


    const [selectedSessionNumber, setSelectedSessionNumber] = useState<string>('')
    const [showSessionDetails, setShowSessionDetails] = useState<boolean>(false)
    const [showAddConsultation, setShowAddConsultation] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteSession, {isLoading:deleteSessionLoading}] = useDeleteSessionMutation()


    const search = searchParams.get('search') || ''
    
    const handleDeleteModal = () =>{
      setDeleteModal(!deleteModal)
    }
    const handleAddConsultation = () =>{
      setShowAddConsultation(!showAddConsultation)
    }

    const {data, isLoading} = useGetSessionsListQuery({page, size:size||10, search:search, filter}, {skipPollingIfUnfocused:true})  
    const [ExportSessions] = useGetSessionsExcelMutation() 

    const options = (row:any)=>(
        <div className='flex gap-4 items-start'>
          <button 
            onClick={()=>{
              setSelectedSessionNumber(row?.id)
              handleAddConsultation()
            }} 
            className=' text-green-600 text-lg transition-all rounded-full' 
          >
            <TbMessageReply />
          </button>
          <button onClick={()=>{
              setSelectedSessionNumber(row?.case_number)
              handleDetailsModel()
            }} className=' text-blue-600 text-lg transition-all rounded-full' ><BsEye />
          </button>
          <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/cases/${row?.case_number}/sessions/${row?.id}/edit`}><BiEdit /></Link>
          <button 
            onClick={()=>{
              setSelectedSessionNumber(row?.id)
              handleDeleteModal()
            }}
            className=' text-lg text-red-500 rounded-full'
          >
            <FaTrash />
          </button>
        </div>
      )
    
    
    const handleDetailsModel = () =>{
      setShowSessionDetails(!showSessionDetails)
    }

    const handleDeleteSession = (id:string) =>{
      deleteSession({id:id})
        .unwrap()
        .then(()=>{
          toast.success(data?.message || "تم حذف الجلسة بنجاح")
          handleDeleteModal()
        }).catch((err:any)=>{
          toast.error(err?.data.message || " حدث خطأ ما وتعذر الإتصال بالخادم برجاء المحاولة لاحقا")
        })
    }
    
  return (
    <>
      <DeleteModal 
        open={deleteModal}
        deleteAction={handleDeleteSession}
        handleClose={handleDeleteModal}
        id={selectedSessionNumber}
        isLoading={deleteSessionLoading}
        title='حذف جلسة'
      >
        هل أنت متأكد من حذف هذه الجلسة ؟ 
      </DeleteModal>

      <CaseDetailsOverLay 
        case_number={selectedSessionNumber}
        handleToggler={handleDetailsModel}
        open={showSessionDetails}
      />
      <AddConsultationModal
        session_id={selectedSessionNumber}
        handleToggler={handleAddConsultation}
        open={showAddConsultation}
      />

      <div className='min-h-[300px] p-5 space-y-4'>
        <TableSettings 
          excel={()=>exportData({ExportSessions, fileName:'الجلسات', params:filter, type:'excel'})}
          pdf={()=>exportData({ExportSessions, fileName:'الجلسات', params:filter, type:'pdf'})}
        />
        
        <div className="p-4">
          <DataTable 
            data={data?.sessions}
            isLoading={isLoading}        
            options={options}
            isOptions={true}
            emptyLinkHref='/sessions'
            emptyText='صفحة جميع الجلسات'
            fnKeys={['case_number', 'id']}
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
