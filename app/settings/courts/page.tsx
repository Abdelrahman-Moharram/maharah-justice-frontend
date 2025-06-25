'use client'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import React, { useCallback, useState } from 'react'
import CourtsList from './_Components/CourtsList'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { to_int_or_default } from '@/Components/utils/helper'
import { FaPlusCircle } from 'react-icons/fa'
import CourtFormModal from './_Components/CourtFormModal'

const BreadcrumbData = [
  {
    href: '/',
    title: 'الصفحة الرئيسية',
  },
  {
    href: '/settings/courts',
    title: 'إعدادات المحاكم',
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
      <CourtFormModal
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
            إضافة محكمة 
          </button>
        </div>
        
        <CourtsList
          page={page}
          size={size}
        />
        
      </div>
    </>
  )
}

export default page
