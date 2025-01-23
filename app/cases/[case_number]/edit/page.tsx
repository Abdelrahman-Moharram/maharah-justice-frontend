'use client'

import Breadcrumb from '@/Components/Common/Breadcrumb';
import CaseForm from '@/app/cases/_Components/CaseForm'
import { useEditCaseMutation } from '@/redux/api/casesApi';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react'
import { HiBuildingLibrary } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { isErrorsList } from '@/Components/Hooks/Common/useValidations';
import useCasesForm from '@/Components/Hooks/Cases/useCases';



const page = () => {
  const {
    caseForm,
    formErrors,
    dropDowns,
    case_number,
    onChange,
    changeDate,
    selectChange,
    changeCustomer,
    changeCheckBox,
    imageChange,
    setFormErrors,
    getCaseAsFormData
  } = useCasesForm()
  const router = useRouter()
  const [editCase, {isLoading}] = useEditCaseMutation()

  const BreadcrumbData = [
    {
      href: '/',
      title: 'الصفحة الرئيسية',
      icon: <HiBuildingLibrary />
    },
    {
      href: '/cases',
      title: 'القضايا',
      // icon: <HiBuildingLibrary />
    },
    {
      href: `/cases/${case_number}/edit`,
      title: 'تعديل قضية رقم "' + case_number+'"',
    }
  ]
  

  


  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    if(isErrorsList(formErrors)){
      toast.error('برجاء التأكد من إدخال بيانات القضية بشكل صحيح أولا')
    }
    else{
      editCase({case_number ,form:getCaseAsFormData()})
      .unwrap()
      .then(data=>{
          toast.success(data?.message)
          router.push("/cases")
        })
        .catch((err:any)=>{     
          setFormErrors(err.data.errors)
        })
    }
  }

  return (
  <div className='p-5 space-y-10 rounded-lg'>
    <Breadcrumb 
      items={BreadcrumbData}
    />
    
    <CaseForm 
      caseForm={caseForm}
      LitigationTypes={dropDowns?.litigation_types}
      circulars={dropDowns?.circulars}
      cities={dropDowns?.cities}
      company_representatives={dropDowns?.company_representatives}
      courts={dropDowns?.courts}
      states={dropDowns?.case_states}
      formSubmit={formSubmit}
      onChange={onChange}
      selectChange={selectChange}
      imageChange={imageChange}
      changeCustomer={changeCustomer}
      changeCheckBox={changeCheckBox}
      changeDate={changeDate}
      errors={formErrors}
      isLoading={isLoading}
      add={false}
    />
    
  </div>
  )
}

export default page
