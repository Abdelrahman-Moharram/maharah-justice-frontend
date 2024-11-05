'use client'
import SessionForm from '@/app/sessions/_Components/SessionForm'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'

import { useAddSessionMutation } from '@/redux/api/sessionsApi'
import { toast } from 'react-toastify'
import useSessionForm from '@/app/sessions/_Components/useSessionForm'
import { useGetSessionFormQuery } from '@/redux/api/casesApi'
import CaseInfo from './_Components/CaseInfo'


const BreadcrumbData = [
  {
    href: '/',
    title: 'الصفحة الرئيسية',
  },
  {
    href: '/sessions',
    title: 'الجلسات',
    // icon: <HiBuildingLibrary />
  },
  {
    href: '/sessions/add',
    title: 'إنشاء جلسة',
    current:true
  }
]
const page = () => {
  const router = useRouter()
  const [addSession, {isLoading}] = useAddSessionMutation()
  const {
    session, 
    onChange, 
    changeDate, 
    changeLawyer, 
    imageChange, 
    selectChange, 
    dropDowns, 
    formErrors, 
    setFormErrors, 
    case_number,
    getSessionAsFormData,

  } = useSessionForm()

 
  const {data, isLoading:caseLoading} = useGetSessionFormQuery({case_number})
  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    addSession({form:getSessionAsFormData()})
    .unwrap()
    .then(data=>{
        toast.success(data?.message)
        router.push("/sessions")
      })
      .catch((err:any)=>{     
        console.log(err);
        if(err.data.errors)
          setFormErrors(err.data.errors)
        if(err.data.message)
          toast.error(err.data.message)
      })
    }
  
  return (
    <div className='min-h-[300px]  space-y-4'>
      <Breadcrumb 
        items={BreadcrumbData}
      />
      
      <CaseInfo 
        data={data?.case}
        isLoading={caseLoading}
      />
      
      <>
        <SessionForm 
          changeDate={changeDate}
          formErrors={formErrors}
          session={session}
          selectChange={selectChange}
          onChange={onChange}
          courts={dropDowns?.courts}
          cities={dropDowns?.cities}
          states={dropDowns?.states}
          changeLawyer={changeLawyer}
          imageChange={imageChange}
          formSubmit={formSubmit}
          isLoading={isLoading}
          add
        />
      </>
    </div>
  )
}

export default page
