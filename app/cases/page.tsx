'use client'
import Paginition from '@/Components/Lists/Paginition'
import DataTable from '@/Components/Tables/DataTable'
import TableSettings from '@/Components/Tables/TableSettings'
import { useGetCasesListQuery, useExportCasesExcelMutation, useDeleteCaseMutation } from '@/redux/api/casesApi'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsEye } from 'react-icons/bs'
import { FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify'
import CaseDetailsOverLay from './_Components/CaseDetailsOverLay'
import DeleteCaseModal from './_Components/DeleteCaseModal'

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
    const [showCaseDetails, setShowCaseDetails] = useState<Boolean>(false)
    const [detailsCaseNumber, setDetailsCaseNumber] = useState<string>('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deletedCase, setDeleteCase] = useState<{case_number:string}>({case_number:''})
    const [deleteCase, {isLoading:deleteCaseLoading}] = useDeleteCaseMutation()
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
    const handleDetailsModel = () =>{
      setShowCaseDetails(!showCaseDetails)
    }
    const handleDeleteModal = () =>{
      setDeleteModal(!deleteModal)
    }
    
    const formData = ({case_number}:{case_number:string}) =>{
      deleteCase({case_number})
        .unwrap()
        .then(()=>{
          toast.success(data?.message || "تم حذف القضية بنجاح")
          handleDeleteModal()
        }).catch((err:any)=>{
          toast.error(err?.data.message || " حدث خطأ ما وتعذر الإتصال بالخادم برجاء المحاولة لاحقا")
        })
    }
     
    const options = (row:any)=>(
      <div className='flex gap-4 items-start'>
        <button onClick={()=>{
            setDetailsCaseNumber(row?.id)
            handleDetailsModel()
          }} className=' text-blue-600 text-lg transition-all rounded-full' ><BsEye /></button>
        <Link className=' text-green-600 text-lg transition-all rounded-full' href={`/cases/${row?.id}/edit`}><BiEdit /></Link>
        <button 
          onClick={()=>{
            setDeleteCase({case_number:row?.id})
            handleDeleteModal()
          }} 
          className=' text-lg text-red-500 rounded-full'><FaTrash /></button>
      </div>
    )
    return (
      <>
        <DeleteCaseModal 
          open={deleteModal}
          handleModal={handleDeleteModal}
          Case={deletedCase}
          formData={formData}
          isLoading={deleteCaseLoading}
        />
        
        <CaseDetailsOverLay 
          case_number={detailsCaseNumber}
          handleToggler={handleDetailsModel}
          open={showCaseDetails}
        />
        <div className='min-h-[300px] space-y-4'>
          <TableSettings 
            excel={downloadFile}
          />
          <div className="p-4">
            <DataTable 
              data={data?.cases}
              isLoading={isLoading}        
              options={options}
              isOptions={true}
              emptyLinkHref='/cases'
              emptyText='صفحة القضايا الرئيسية'
              fnKeys={['id']}
            />
          </div>
          <div className='flex justify-center my-10 font-extrabold'>
              {
                data?.cases.length?
                  <Paginition page={page} totalPages={data?.total_pages} />
                :null
              }
          </div>
        </div>
      </>
    )
}

export default page
