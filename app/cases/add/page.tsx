'use client'

import Breadcrumb from '@/Components/Common/Breadcrumb';
import CaseForm from '@/Components/Forms/CaseForm'
import { useCreateCaseMutation } from '@/redux/api/casesApi';
import { useGetCaseFormDropDownsQuery } from '@/redux/api/utilsApi';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { HiBuildingLibrary } from 'react-icons/hi2';
import { toast } from 'react-toastify';

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
  date_ar:  string;
  case_attachment?: File[] | null,
  customer_name:''
}


const page = () => {
  const router = useRouter()
  const [createCase, {isLoading}] = useCreateCaseMutation()
  const [caseForm, setcaseForm] = useState<CaseType>({
    case_number:'',
    agreement_number:'',
    amount:'',
    notes:'',
    is_aganist_company:false,
    court:'',
    circular:'',
    city:'',
    state:'',
    litigation_type:'',
    company_representative:'',
    customer:'',
    cust_phone_number:'',
    commercial_number:'',
    date_ar:'',
    case_attachment:[],
    customer_name:''
  })

  const BreadcrumbData = [
    {
      href: '/cases',
      title: 'القضايا',
      icon: <HiBuildingLibrary />
    },
    {
      href: '/cases/add',
      title: 'إنشاء قضية',
    }
  ]
const [formErrors, setFormErrors] = useState(null)
const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
  const { name, value } = event.target;
  setcaseForm({ ...caseForm, [name]: value });
};
const changeCustomer = (val:string)=>{
  setcaseForm({ ...caseForm, customer: val })
}
const selectChange = (e: ChangeEvent<HTMLSelectElement> )=>{
    const { name, value } = e.target;        
    setcaseForm({ ...caseForm, [name]: value });
}

const imageChange = (file:File )=>{
    if(caseForm.case_attachment?.length)
      setcaseForm({ ...caseForm, case_attachment: [...caseForm.case_attachment, file] });
    else
      setcaseForm({ ...caseForm, case_attachment: [file] });

}
const changeCheckBox = (event: ChangeEvent<HTMLInputElement>)  =>{
  const { name, checked } = event.target;   
    setcaseForm({ ...caseForm, [name]: checked })
}
  const {data: dropDowns} = useGetCaseFormDropDownsQuery(undefined)

  


  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const formData = new FormData()
    formData.append('case_number', caseForm.case_number)
    formData.append('agreement_number', caseForm.agreement_number)
    formData.append('amount', caseForm.amount)
    formData.append('notes', caseForm.notes)
    formData.append('is_aganist_company', JSON.stringify(caseForm.is_aganist_company))
    formData.append('court', caseForm.court)
    formData.append('circular', caseForm.circular)
    formData.append('city', caseForm.city)
    formData.append('state', caseForm.state)
    formData.append('litigation_type', caseForm.litigation_type)
    formData.append('company_representative', caseForm.company_representative)
    formData.append('customer', caseForm.customer)
    formData.append('cust_phone_number', caseForm.cust_phone_number)
    formData.append('commercial_number', caseForm.commercial_number)
    formData.append('date_ar', caseForm.date_ar)

    if(caseForm?.case_attachment?.length)
      for (let attch of caseForm?.case_attachment){
        formData.append('case_attachments', attch)
      }
    
    
    
    
    createCase({form:formData})
    .unwrap()
    .then(data=>{
        toast.success(data?.message)
        router.push("/cases")
      })
      .catch((err:any)=>{     
        setFormErrors(err.data.errors)
      })
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
      errors={formErrors}
      isLoading={isLoading}
      add
    />
    
  </div>
  )
}

export default page
