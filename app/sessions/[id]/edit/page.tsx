'use client'
import React, { FormEvent } from 'react'

import CaseInfo from '@/app/cases/[case_number]/sessions/add/_Components/CaseInfo'
import { toast } from 'react-toastify'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import { useParams, useRouter } from 'next/navigation'
import { useSessionForm } from '@/Components/Hooks/Sessions'
import SessionForm from '@/app/sessions/_Components/SessionForm'
import { useEditSessionMutation, useGetSessionCaseInfoQuery } from '@/redux/api/sessionsApi'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'

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
      href: '/sessions/edit',
      title: 'تعديل جلسة',
      current:true
    }
  ]
const page = () => {
    const router = useRouter()
  const [editSession, {isLoading}] = useEditSessionMutation()
  // const {id}:{id:string} = useParams()
  const {id}:{id:string} = useParams()
  const {data, isLoading:caseLoading} = useGetSessionCaseInfoQuery({session_id:id})
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
    // case_number,
    getSessionAsFormData,
  } = useSessionForm({id:id, case_number:data?.case_number})

 
  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    if(!isErrorsList(formErrors)){
      editSession({form:getSessionAsFormData(), id:id})
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
    else{
      toast.error('برجاء التأكد من إدخال بيانات الجلسة بشكل صحيح أولا')
    }
    
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
          add={false}
        />
      </>
    </div>
  )
}

export default page
