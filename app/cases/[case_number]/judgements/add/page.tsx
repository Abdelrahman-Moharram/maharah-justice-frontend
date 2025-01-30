'use client'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import useJudgementsForm from '@/Components/Hooks/Judgements/useJudgements'
import { useParams, useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'
import CaseInfo from '../../sessions/add/_Components/CaseInfo'
import { useAddJudgementMutation, useGetJudgementCaseInfoQuery } from '@/redux/api/JudgementsApi'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import { toast } from 'react-toastify'
import JudgementForm from '@/app/judgements/_Components/JudgementForm'
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
    href: '/judgements/add',
    title: 'إضافة حكم',
    current:true
  }
]
const page = () => {
  const {case_number}:{case_number:string} = useParams()
  const {data, isLoading:caseLoading} = useGetJudgementCaseInfoQuery({case_number})
  const [addJudgement, {isLoading}] = useAddJudgementMutation()
  const router = useRouter()

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
  } = useJudgementsForm({case_number})
  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    console.log(formErrors);
    
    if(isErrorsList(formErrors)){
      toast.error('برجاء التأكد من إدخال بيانات الجلسة بشكل صحيح أولا')
      return
    }
    addJudgement({form:getJudgementAsFormData()})
    .unwrap()
    .then(res=>{
        toast.success(res?.message)
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
        add
      />
      
    </div>
  )
}

export default page
