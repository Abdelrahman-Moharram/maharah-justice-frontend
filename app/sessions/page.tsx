'use client'
import React, { useCallback, useState } from 'react'
import TableSettings from '@/Components/Tables/TableSettings'
import DataTable from '@/Components/Tables/DataTable'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDeleteSessionMutation, useGetSessionsExcelMutation, useGetSessionsListQuery } from '@/redux/api/sessionsApi'
import { BiEdit } from 'react-icons/bi'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'
import { BsEye } from 'react-icons/bs'
import Paginition from '@/Components/Lists/Paginition'
import CaseDetailsOverLay from '../cases/_Components/CaseDetailsOverLay'
import DeleteModal from '@/Components/Modals/DeleteModal'
import { toast } from 'react-toastify'


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
    const  filter  = searchParams.get('filter')
    let size       = to_int_or_default(searchParams.get("size"))
    let page       = to_int_or_default(searchParams.get("page"))
    const [deleteModal, setDeleteModal] = useState(false)
    const [deletedSession, setDeleteSession] = useState<string>('')
    const [deleteSession, {isLoading:deleteSessionLoading}] = useDeleteSessionMutation()


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
    const search = searchParams.get('search') || ''
    if(!size){
        router.push(pathname + '?' + createQueryString('size', "10"))
    }
    if(!page){
        page = 1
        router.push(pathname + '?' + createQueryString('page', "1"))
    }
    const handleDeleteModal = () =>{
      setDeleteModal(!deleteModal)
    }

    const {data, isLoading} = useGetSessionsListQuery({page:page-1, size:size??10, search:search, filter}, {skipPollingIfUnfocused:true})  
    const [ExportSessions] = useGetSessionsExcelMutation() 
    const options = (row:any)=>(
        <div className='flex gap-4 items-start'>
          <button onClick={()=>{
              setDetailsSessionNumber(row?.case_number)
              handleDetailsModel()
            }} className=' text-blue-600 text-lg transition-all rounded-full' ><BsEye /></button>
          <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/cases/${row?.case_number}/sessions/${row?.id}/edit`}><BiEdit /></Link>
          <button 
            onClick={()=>{
              setDeleteSession(row?.id)
              handleDeleteModal()
            }}
            className=' text-lg text-red-500 rounded-full'
          >
            <FaTrash />
          </button>
        </div>
      )
    
    const exportData = (type:string) => {
      let ext = ''
      if (type==='pdf')
        ext = 'pdf'
      else if (type==='excel')
        ext = 'xlsx' 
      ExportSessions({type, filter})
      .unwrap()
      .then(res=>{        
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = `الجلسات.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
    };
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
    <div>
      <DeleteModal 
        open={deleteModal}
        deleteAction={handleDeleteSession}
        handleClose={handleDeleteModal}
        id={deletedSession}
        isLoading={deleteSessionLoading}
        title='حذف جلسة'

      >
        هل أنت متأكد من حذف هذه الجلسة ؟ 
      </DeleteModal>
      <CaseDetailsOverLay 
        case_number={detailsSessionNumber}
        handleToggler={handleDetailsModel}
        open={showSessionDetails}
      />
      <div className='min-h-[300px] p-5 space-y-4'>
        <TableSettings 
          excel={()=>exportData('excel')}
          pdf={()=>exportData('pdf')}
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
            {
              data?.sessions?.length?
                <Paginition page={page} totalPages={data?.total_pages} />
              :null
            }
        </div>
      </div>
    </div>
  )
}

export default page
