'use client'
import arabic_en from "react-date-object/locales/arabic_en"
import { useGetSessionFormDropDownsQuery } from "@/redux/api/utilsApi"
import { ChangeEvent, useEffect, useState } from "react"
import { DateObject } from "react-multi-date-picker"

import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"
import { JudgementsFormType } from "@/Components/Types/Judgements"


export default function useJudgementsForm({session_id}:{session_id:string}){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetSessionFormDropDownsQuery(undefined)
    
    const [judgement, setJudgement] = useState<JudgementsFormType>({
        session:session_id,
        number:'',
        court:'',
        amount:0,
        date_ar:null,
        notes:'',
        result:'',
        is_aganist_company:false,
        judgement_attachments:[]
    })
   
    
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setJudgement({ ...judgement, [name]: value });
    };
    const changeDate = (date:DateObject | null, validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, date_ar:DefaultInputValidate({name:'date_ar', value:date||"", validationSchema})})
        setJudgement({ ...judgement, date_ar: date });
    }
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setJudgement({ ...judgement, [name]: value });
    }

    const imageChange = (file:File)=>{
        if(judgement.judgement_attachments?.length)
            ({ ...judgement, judgement_attachments: [...judgement.judgement_attachments, file] });
        else
            setJudgement({ ...judgement, judgement_attachments: [file] });
    }

    const changeCheckBox = (event: ChangeEvent<HTMLInputElement>, validationSchema?:ValidationsType )  =>{
        const { name, checked } = event.target;   
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value:checked, validationSchema})})
          setJudgement({ ...judgement, [name]: checked })
      }

    const getJudgementAsFormData = () =>{
        
        const formData = new FormData()
        formData.append('number', judgement.number)
        formData.append('session', judgement.session)
        formData.append('court', judgement.court)
        formData.append('amount', JSON.stringify(judgement.amount))
        formData.append('date_ar', judgement.date_ar?.setLocale(arabic_en).toString()??'')
        formData.append('notes', judgement.notes)
        formData.append('result', judgement.result)
        formData.append('is_aganist_company',  JSON.stringify(judgement.is_aganist_company))
        

        if(judgement?.judgement_attachments?.length)
            for (let attch of judgement?.judgement_attachments){
                formData.append('judgement_attachments', attch)
            }

        return formData
    }

    return {
        judgement,
        formErrors,
        dropDowns,
        onChange,
        changeDate,
        selectChange,
        imageChange,
        changeCheckBox,
        setFormErrors,
        getJudgementAsFormData
    }
    
}