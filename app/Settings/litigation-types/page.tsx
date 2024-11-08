'use client'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import React, { useCallback, useState } from 'react'
import LitigationTypesList from './_Components/LitigationTypesList'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { to_int_or_default } from '@/Components/utils/helper'
import { FaPlusCircle } from 'react-icons/fa'
import LitigationTypeFormModal from './_Components/LitigationTypeFormModal'

const BreadcrumbData = [
  {
    href: '/',
    title: 'الصفحة الرئيسية',
  },
  {
    href: '/settings/litigation_types',
    title: 'إعدادات أنواع القضايا',
    current:true
  }
]

const page = () => {
  const searchParams = useSearchParams()
  const [modal, setModal] = useState(false)
  const handleToggler = () =>{   
    setModal(!modal)
  }
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
  if(!size){
    size = 24
    router.push(pathname + '?' + createQueryString('size', '24'))
  }
  if(!page){
    page = 1
    router.push(pathname + '?' + createQueryString('page', "1"))
  }
  
  return (
    <>
      <LitigationTypeFormModal
        handleToggler={handleToggler}
        open={modal}
      />
      <div className='px-4'>
        <div className="my-8 flex justify-between">
          <Breadcrumb
            items={BreadcrumbData}
          />
          <button 
            onClick={handleToggler}
            className="px-8 bg-primary hover:bg-primary/90 transition-all h-fit p-2 rounded-md text-negitaive-color flex items-center gap-3"
          >
            <FaPlusCircle /> 
            إضافة نوع قضية 
          </button>
        </div>
        
        <LitigationTypesList
          page={page}
          size={size}
        />
        
      </div>
    </>
  )
}

export default page
