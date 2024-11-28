'use client'
import CaseInfo from '@/app/cases/[case_number]/sessions/add/_Components/CaseInfo'
import ApplealsForm from '@/app/judgements/_Components/ApplealsForm'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import useAppealForm from '@/Components/Hooks/Judgements/useAppealForm'
import { useAddAppealMutation, useGetJudgementCaseInfoQuery } from '@/redux/api/JudgementsApi'
import { useParams, useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const {number, appeal_id}:{number:string, appeal_id:string} = useParams()
  const {data, isLoading:caseLoading} = useGetJudgementCaseInfoQuery({judgement_number:number})
  const [addAppeal, {isLoading}] = useAddAppealMutation()
  const router = useRouter()
  const BreadcrumbData = [
    {
      href: '/',
      title: 'الصفحة الرئيسية',
    },
    {
      href: '/judgements',
      title: 'الأحكام',
      // icon: <HiBuildingLibrary />
    },
    {
      href: `/judgements/${number}/edit`,
      title: `تعديل إعتراض للحكم رقم "${number}"`,
      current:true
    }
  ]
  const {
      appeal,
      dropDowns,
      formErrors,
      getAppealAsFormData,
      onChange,
      selectChange,
      setFormErrors,
      changeDate
  } = useAppealForm({judgement:number, appeal_id})
  const formSubmit = (e:FormEvent)=>{
    e.preventDefault()
    // console.log(getAppealAsFormData());
    if(isErrorsList(formErrors)){
      toast.error('برجاء التأكد من إدخال بيانات الجلسة بشكل صحيح أولا')
      return
    }
    addAppeal({form:getAppealAsFormData(), number})
    .unwrap()
    .then(res=>{
        toast.success(res?.message)
        router.push("/cases")
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
    <div className='space-y-4 px-4'>
      <Breadcrumb 
        items={BreadcrumbData}
      />
      <CaseInfo
        data={data?.case}
        isLoading={caseLoading}
      />
      <ApplealsForm 
        appeal={appeal}
        cities={dropDowns?.cities}
        courts={dropDowns?.courts}
        formErrors={formErrors}
        onChange={onChange}
        selectChange={selectChange}
        changeDate={changeDate}
        formSubmit={formSubmit}
        isLoading={isLoading}
        add
      />
    </div>
  )
}

export default page
