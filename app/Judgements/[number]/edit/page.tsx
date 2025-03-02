'use client'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import useJudgementsForm from '@/Components/Hooks/Judgements/useJudgements'
import { useParams, useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'
import { useEditJudgementMutation, useGetJudgementCaseInfoQuery } from '@/redux/api/JudgementsApi'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import { toast } from 'react-toastify'
import JudgementForm from '@/app/judgements/_Components/JudgementForm'
import CaseInfo from '@/app/cases/[case_number]/sessions/add/_Components/CaseInfo'

const page = () => {
  const {number}:{number:string} = useParams()
  const {data, isLoading:caseLoading} = useGetJudgementCaseInfoQuery({judgement_number:number})
  const [editJudgement, {isLoading}] = useEditJudgementMutation()
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
      title: 'تعديل حكم',
      current:true
    }
  ]
  const {
    judgement,
    formErrors,
    dropDowns,
    onChange,
    selectChange,
    changeDate,
    imageChange,
    changeCheckBox,
    setFormErrors,
    getJudgementAsFormData,
  } = useJudgementsForm({case_number: data?.case_number, number})


  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    
    if(isErrorsList(formErrors)){
      toast.error('برجاء التأكد من إدخال بيانات الجلسة بشكل صحيح أولا')
      return
    }
    editJudgement({form:getJudgementAsFormData(), number})
    .unwrap()
    .then(res=>{
        toast.success(res?.message)
        router.push("/cases")
      })
      .catch((err:any)=>{     
        
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
      <JudgementForm
        judgement={judgement}
        onChange={onChange}
        changeDate={changeDate}
        courts={dropDowns?.courts}
        formErrors={formErrors}
        formSubmit={formSubmit}
        imageChange={imageChange}
        isLoading={isLoading}
        selectChange={selectChange}
        changeCheckBox={changeCheckBox}
        add={false}
      />
      
    </div>
  )
}

export default page
