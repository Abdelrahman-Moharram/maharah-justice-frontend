'use client'
import { useGetSessionFormDropDownsQuery } from "@/redux/api/utilsApi"
import { ChangeEvent, useEffect, useState } from "react"

import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"
import { appealFormType } from "@/Components/Types/appeals"
import arabic_en from "react-date-object/locales/arabic_en"
import { DateObject } from "react-multi-date-picker"




export default function useAppealForm({judgement, appeal_id}:{judgement:string, appeal_id?:string}){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetSessionFormDropDownsQuery(undefined)
    const [appeal, setAppeal] = useState<appealFormType>({
        id:appeal_id,
        judgement:judgement,
        date_ar:null,
        city:'',
        court:'',
        result:'',
    })
    // useEffect(()=>{
    //     if(number){
    //         editJudgementForm({number})
    //         .then(res=>{
    //             setAppeal(res?.data?.judgement)
    //             setAppeal(prev=>({...prev, amount: parseFloat(res?.data?.judgement?.amount)}))
    //         })
    //     }
    // },[number])
    
    
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;       
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setAppeal({ ...appeal, [name]: value });
    };
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setAppeal({ ...appeal, [name]: value });
    }

    const changeDate = (date:DateObject | null, validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, date_ar:DefaultInputValidate({name:'date_ar', value:date||"", validationSchema})})
        setAppeal({ ...appeal, date_ar: date });
    }

    

    

    const getAppealAsFormData = () =>{
        
        const formData = new FormData()
        if(appeal?.id)
            formData.append('id'               , appeal.id)

        formData.append('judgement'            , appeal.judgement)
        formData.append('city'                 , appeal.city)
        formData.append('date_ar'              , appeal.date_ar?.setLocale(arabic_en).toString()??'')
        formData.append('court'                , appeal.court)
        formData.append('result'               , appeal.result)
        

        return formData
    }

    return {
        appeal,
        formErrors,
        dropDowns,
        onChange,
        changeDate,
        selectChange,
        setFormErrors,
        getAppealAsFormData
    }
    
}
