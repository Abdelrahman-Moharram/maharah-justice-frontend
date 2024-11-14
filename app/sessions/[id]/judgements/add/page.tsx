'use client'
import JudgementForm from '@/app/Judgements/_Components/JudgementForm'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import useJudgementsForm from '@/Components/Hooks/Judgements/useJudgements'
import { useParams } from 'next/navigation'
import React, { FormEvent } from 'react'
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
  const {id}:{id:string} = useParams()
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
  } = useJudgementsForm({session_id:id})
  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
  }
  return (
    <div className='space-y-4 px-4'>
      <Breadcrumb 
        items={BreadcrumbData}
      />
      <JudgementForm
        judgement={judgement}
        onChange={onChange}
        changeDate={changeDate}
        courts={dropDowns?.courts}
        formErrors={formErrors}
        formSubmit={formSubmit}
        imageChange={imageChange}
        isLoading={false}
        selectChange={selectChange}
        changeCheckBox={changeCheckBox}
        add
      />
      
    </div>
  )
}

export default page
