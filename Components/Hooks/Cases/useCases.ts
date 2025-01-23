'use client'
import arabic_en from "react-date-object/locales/arabic_en"
import { useGetCaseFormDropDownsQuery } from "@/redux/api/utilsApi"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { DateObject } from "react-multi-date-picker"

import arabic_ar from "react-date-object/locales/arabic_ar"

import arabic from "react-date-object/calendars/arabic"
import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"
import { caseFilterType, CaseFormType } from "@/Components/Types/case"
import { useGetCaseFormMutation } from "@/redux/api/casesApi"
import { updateSearchQuery } from "@/Components/utils/helper"


export default function useCasesForm(){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data: dropDowns} = useGetCaseFormDropDownsQuery(undefined)

    const {case_number}:{case_number:string} = useParams()
    const [getCaseForm] = useGetCaseFormMutation()
    const [caseForm, setcaseForm] = useState<CaseFormType>({
      case_number:'',
      agreement_number:'',
      amount:'',
      notes:'',
      is_aganist_company:false,
      court:'',
      circular:'',
      city:'',
      // state:'',
      litigation_type:'',
      company_representative:'',
      customer:'',
      cust_phone_number:'',
      commercial_number:'',
      date_ar:null,
      attachments:[],
      customer_name:''
    })
    useEffect(()=>{
      if(case_number){
        getCaseForm({case_number:case_number})
        .then(res=>{
          setcaseForm(res?.data?.case)      
          const date = new DateObject({ date: res?.data?.case?.date_ar, format:'DD-MM-YYYY', calendar:arabic, locale:arabic_ar })
          setcaseForm(prev=>({...prev, date_ar: date}))          
        })
      }

    }, [case_number])
  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
    const { name, value } = event.target;
    if(validationSchema)
      setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
    setcaseForm({ ...caseForm, [name]: value });
  };
  const changeCustomer = (val:string, validationSchema?:ValidationsType)=>{
    if(validationSchema)
      setFormErrors({...formErrors, customer:DefaultInputValidate({name:'customer', value:val, validationSchema})})
    setcaseForm({ ...caseForm, customer: val })
  }
  const selectChange = (e: ChangeEvent<HTMLSelectElement>, validationSchema?:ValidationsType )=>{
      const { name, value } = e.target;        
      if(validationSchema)
        setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
      setcaseForm({ ...caseForm, [name]: value });
  }

  const imageChange = (file:File, idx?:string)=>{
      if(caseForm.attachments?.length){
        if(idx && caseForm.attachments?.length < Number(idx)){
          setcaseForm({ ...caseForm, attachments: caseForm.attachments.splice(Number(idx), 1, file) });
        }
        else
          setcaseForm({ ...caseForm, attachments: [...caseForm.attachments, file] });
      }
      else
        setcaseForm({ ...caseForm, attachments: [file] });
  }
  const changeCheckBox = (event: ChangeEvent<HTMLInputElement>, validationSchema?:ValidationsType )  =>{
    const { name, checked } = event.target;   
    if(validationSchema)
        setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value:checked, validationSchema})})
      setcaseForm({ ...caseForm, [name]: checked })
  }
  const changeDate = (date:DateObject | null, validationSchema?:ValidationsType)=>{
    if(validationSchema)
      setFormErrors({...formErrors, date_ar:DefaultInputValidate({name:'date_ar', value:date||"", validationSchema})})
    setcaseForm({ ...caseForm, date_ar: date });
  }


    const getCaseAsFormData = () =>{
        
        const formData = new FormData()
        formData.append('case_number', caseForm.case_number)
        formData.append('agreement_number', caseForm.agreement_number)
        formData.append('amount', caseForm.amount)
        formData.append('notes', caseForm.notes)
        formData.append('is_aganist_company', JSON.stringify(caseForm.is_aganist_company))
        formData.append('court', caseForm.court)
        formData.append('circular', caseForm.circular)
        formData.append('city', caseForm.city)
        // formData.append('state', caseForm.state)
        formData.append('litigation_type', caseForm.litigation_type)
        formData.append('company_representative', caseForm.company_representative)
        formData.append('customer', caseForm.customer)
        formData.append('cust_phone_number', caseForm.cust_phone_number)
        formData.append('commercial_number', caseForm.commercial_number)
        formData.append('date_ar', caseForm.date_ar?.setLocale(arabic_en).toString()??'')

        if(caseForm?.attachments?.length)
        for (let attch of caseForm?.attachments){
          formData.append('attachments', attch)
        }

        return formData
    }

    return {
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
    }
    
}


export function useCaseFilters(){
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  

  const [filtersErrors, setFiltersErrors] = useState<any>(null)
  const [filters, setFilters] = useState<caseFilterType>({
    search      :'',
    start_date  :null,
    end_date    :null
  })

  useEffect(()=>{
    setFilters({
      ...filters,
      search      :  params.get('search') || '',
      start_date  :  params.get('start_date') ? new DateObject({ date: params.get('start_date') || '', format:'DD-MM-YYYY', calendar:arabic, locale:arabic_ar }) : null,
      end_date    :  params.get('end_date') ? new DateObject({ date: params.get('end_date') || '', format:'DD-MM-YYYY', calendar:arabic, locale:arabic_ar }) : null
    })    
  }, [])
  
  const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
    const { name, value } = event.target;
    if(validationSchema)
      setFiltersErrors({...filtersErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
    setFilters({ ...filters, [name]: value });
    updateSearchQuery({ ...filters, [name]: value }, pathname, router, params);
  };
  const changeDate = (date:DateObject | null, name: string, validationSchema?:ValidationsType)=>{
    if(validationSchema)
      setFiltersErrors({...filtersErrors, name:DefaultInputValidate({name:name, value:date||"", validationSchema})})
    setFilters({ ...filters, [name]: date });
    updateSearchQuery({ ...filters, [name]: date }, pathname, router, params);
  }

  

  


  return {
    onChange,
    changeDate,
    filters,
  }

}