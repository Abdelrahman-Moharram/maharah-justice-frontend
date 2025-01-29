'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { DateObject } from "react-multi-date-picker"

import arabic_ar from "react-date-object/locales/arabic_ar"

import arabic from "react-date-object/calendars/arabic"
import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"
import { updateSearchQuery } from "@/Components/utils/helper"
import { caseFilterType } from "./types"

export function useFilters(){
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
      filtersErrors
    }
  
  }