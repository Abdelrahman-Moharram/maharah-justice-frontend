'use client'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import DataTable from '@/Components/Tables/DataTable'
import { to_int_or_default } from '@/Components/utils/helper'
import { useGetLawyersListQuery } from '@/redux/api/accountsApi'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import Paginition from '@/Components/Lists/Paginition'
import { BiEdit } from 'react-icons/bi'
import LawyerFormOverLay from './_Components/LawyerFormOverLay'


const BreadcrumbData = [
  {
    href: '/',
    title: 'الصفحة الرئيسية',
  },
  {
    href: '/settings/lawyers',
    title: 'إعدادات المحامين',
    current:true
  }
]

const page = () => {
    const [showOverLay, setShowOverLay] = useState(false)
    const [lawyerId, setLawyerId] = useState('')
    const searchParams = useSearchParams()
  
    
    let size = to_int_or_default(searchParams.get("size")) 
    let page = to_int_or_default(searchParams.get("page")) 
    
    
  
    const handleOverLay = () =>{
      
      if(lawyerId)
        setLawyerId('')
      setShowOverLay(!showOverLay)
    }
    const {data, isLoading} = useGetLawyersListQuery({page:page, size})
  
    const options = (row:any)=>(
      <div key={row?.id} className='flex gap-4 items-start'>
        <button onClick={()=>{handleOverLay();setLawyerId(row?.id)}} className=' text-blue-600 text-lg transition-all rounded-full' ><BiEdit />
        </button>
      </div>
    )
  return (
    <>
      <LawyerFormOverLay
        handleOpen={handleOverLay}
        open={showOverLay}
        lawyer={lawyerId}
      />
      <div className='px-4'>
        
        <div className="my-8 flex justify-between items-center">
          <Breadcrumb
            items={BreadcrumbData}
          />
            <button 
              onClick={handleOverLay}
              className="px-8 bg-primary hover:bg-primary/90 transition-all h-fit p-2 rounded-md text-negitaive-color flex items-center gap-3"
            >
              <FaPlusCircle /> 
              إضافة محامي 
            </button>
        </div>

        <DataTable
          data={data?.lawyers}
          isLoading={isLoading}
          fnKeys={['id', 'is_active']}
          emptyLinkHref='/settings/lawyers'
          emptyText='صفحة إعدادات المحامين'
          isOptions
          options={options}
        />
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
