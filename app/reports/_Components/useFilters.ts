'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { DateObject } from "react-multi-date-picker"

import arabic_ar from "react-date-object/locales/arabic_ar"

import arabic from "react-date-object/calendars/arabic"
import { ValidationsType } from "@/Components/Types/Others"
import { updateSearchQuery } from "@/Components/utils/helper"
import { DefaultInputValidate } from "@/Components/Hooks/Common/useValidations"
import { useGetReportFiltersDropdownsQuery } from "@/redux/api/casesApi"

interface filterType{
    search?         : string,
    start_date?     : DateObject|null,
    end_date?       : DateObject|null,
    city            : string,
    customer_type   : string,
} 
const initialFilter = {
    search        :'',
    start_date    :null,
    end_date      :null,
    city          :'',
    customer_type :''
  }
export function useFilters(){
    const searchParams  = useSearchParams();
    const pathname      = usePathname();
    const router        = useRouter();
    const params        = new URLSearchParams(searchParams);
    const filter        =  params.get('filter')
    
  
    const [filtersErrors, setFiltersErrors] = useState<any>({})
    const [filters, setFilters] = useState<filterType>(initialFilter)
    const {data:dropdowns} = useGetReportFiltersDropdownsQuery(undefined)
    
    useEffect(()=>{
        setFilters(initialFilter)
        if(initialFilter)
          updateSearchQuery({ ...initialFilter }, pathname, router, params);

    },[filter])

    useEffect(()=>{
      setFilters({
        ...filters,
        search          :  params.get('search') || '',
        start_date      :  params.get('start_date') ? new DateObject({ date: params.get('start_date') || '', format:'DD-MM-YYYY', calendar:arabic, locale:arabic_ar }) : null,
        end_date        :  params.get('end_date') ? new DateObject({ date: params.get('end_date') || '', format:'DD-MM-YYYY', calendar:arabic, locale:arabic_ar }) : null,
        city            :  params.get('city') || '',
        customer_type   :  params.get('customer_type') || '',
      })    

      
    }, [])
    
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?: ValidationsType ) => {
      const { name, value } = event.target;
      if(validationSchema)
        setFiltersErrors({...filtersErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
      setFilters({ ...filters, [name]: value });

      if(filtersErrors && !Object.keys(filtersErrors).includes(name))
        updateSearchQuery({ ...filters, [name]: value }, pathname, router, params);
    };
    const changeDate = (date:DateObject | null, name: string, validationSchema?:ValidationsType)=>{
      if(validationSchema)
        setFiltersErrors({...filtersErrors, name:DefaultInputValidate({name:name, value:date||"", validationSchema})})
      setFilters({ ...filters, [name]: date });
      if(filtersErrors && !Object.keys(filtersErrors).includes(name))
        updateSearchQuery({ ...filters, [name]: date }, pathname, router, params);
    };


    const selectChange = (e: ChangeEvent<HTMLSelectElement>, validationSchema?:ValidationsType )=>{
        const { name, value } = e.target;        
        if(validationSchema)
          setFiltersErrors({...filtersErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setFilters({ ...filtersErrors, [name]: value });
        if(filtersErrors && !Object.keys(filtersErrors)?.includes(name))
          updateSearchQuery({ ...filters, [name]: value }, pathname, router, params);

    }
  
    
  
    
  
  
    return {
        filters,
        filtersErrors,
        dropdowns,
        onChange,
        changeDate,
        selectChange,
    }
  
  }