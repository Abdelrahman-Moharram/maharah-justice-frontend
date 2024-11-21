'use client'

import Breadcrumb from '@/Components/Common/Breadcrumb';
import CaseForm from '@/app/cases/_Components/CaseForm'
import { useEditCaseMutation } from '@/redux/api/casesApi';
import { useGetCaseFormDropDownsQuery } from '@/redux/api/utilsApi';
import { useParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { HiBuildingLibrary } from 'react-icons/hi2';
import { DateObject } from 'react-multi-date-picker';
import { toast } from 'react-toastify';
import arabic_en from "react-date-object/locales/arabic_en"
import useCasesForm from '@/Components/Hooks/Cases/useCasesForm';
import { isErrorsList } from '@/Components/Hooks/Common/useValidations';

interface CaseType{
  case_number:  string;
  agreement_number: string;
  amount: string;
  notes:  string;
  is_aganist_company: boolean;
  court:  string;
  circular: string;
  city: string;
  state:  string;
  litigation_type:  string;
  company_representative: string;
  customer: string;
  cust_phone_number:  string;
  commercial_number:  string;
  date_ar:  DateObject|null;
  case_attachment?: File[] | null,
  customer_name:string
}


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
