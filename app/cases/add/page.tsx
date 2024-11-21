'use client'

import Breadcrumb from '@/Components/Common/Breadcrumb';
import CaseForm from '@/app/cases/_Components/CaseForm'
import { useCreateCaseMutation } from '@/redux/api/casesApi';
import { useRouter } from 'next/navigation';
import React, { FormEvent} from 'react'
import { toast } from 'react-toastify';
import useCasesForm from '@/Components/Hooks/Cases/useCasesForm';
import { isErrorsList } from '@/Components/Hooks/Common/useValidations';

const BreadcrumbData = [
  {
    href: '/',
    title: 'الصفحة الرئيسية',
  },
  {
    href: '/cases',
    title: 'القضايا',
    // icon: <HiBuildingLibrary />
  },
  {
    href: '/cases/add',
    title: 'إنشاء قضية',
    current:true
  }
]

const page = () => {
  const router = useRouter()
  const [createCase, {isLoading}] = useCreateCaseMutation()
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

  
  


  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    console.log(isErrorsList(formErrors));
    
    if(isErrorsList(formErrors)){
      toast.error('برجاء التأكد من إدخال بيانات القضية بشكل صحيح أولا')
    }
    else{
      createCase({form:getCaseAsFormData()})
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
      add
    />
    
  </div>
  )
}

export default page
