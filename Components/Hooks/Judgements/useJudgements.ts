'use client'
import arabic_en from "react-date-object/locales/arabic_en"
import { useGetSessionFormDropDownsQuery } from "@/redux/api/utilsApi"
import { ChangeEvent, useEffect, useState } from "react"

import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"
import { JudgementsFormType } from "@/Components/Types/Judgements"
import { useEditJudgementFormMutation } from "@/redux/api/JudgementsApi"
import { DateObject } from "react-multi-date-picker"


export default function useJudgementsForm({case_number, number}:{case_number:string, number?:string}){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetSessionFormDropDownsQuery(undefined)
    const [editJudgementForm] = useEditJudgementFormMutation()
    const [judgement, setJudgement] = useState<JudgementsFormType>({
        case_number:case_number,
        number:'',
        court:'',
        amount:0,
        last_date_to_appeal:null,
        notes:'',
        result:'',
        is_aganist_company:false, 
        is_executable:false, 
        is_objectionable:false, 
        attachments:[],
    })
    useEffect(()=>{
        
        if(number){
            editJudgementForm({number})
            .then(res=>{
                setJudgement(res?.data?.judgement)
                setJudgement(prev=>({...prev, amount: parseFloat(res?.data?.judgement?.amount)}))
            })
        }
    },[number])
    
    
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;       
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setJudgement({ ...judgement, [name]: value });
    };
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setJudgement({ ...judgement, [name]: value });
    }

    const imageChange = (file:File)=>{
        if(judgement.attachments?.length)
            ({ ...judgement, attachments: [...judgement.attachments, file] });
        else
            setJudgement({ ...judgement, attachments: [file] });
    }

    const changeCheckBox = (event: ChangeEvent<HTMLInputElement>, validationSchema?:ValidationsType )  =>{
        const { name, checked } = event.target;   
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value:checked, validationSchema})})
          setJudgement({ ...judgement, [name]: checked })
    }

    const changeDate = (date:DateObject | null, validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, last_date_to_appeal:DefaultInputValidate({name:'last_date_to_appeal', value:date||"", validationSchema})})
        setJudgement({ ...judgement, last_date_to_appeal: date });
    }

    

    const getJudgementAsFormData = () =>{
        
        const formData = new FormData()
        formData.append('number'                , judgement.number)
        formData.append('case_number'           , judgement.case_number)
        formData.append('court'                 , judgement.court)
        formData.append('amount'                , String(judgement.amount))
        formData.append('last_date_to_appeal'   , judgement.last_date_to_appeal?.setLocale(arabic_en).toString()??'')
        formData.append('notes'                 , judgement.notes)
        formData.append('result'                , judgement.result)
        formData.append('is_aganist_company'    , JSON.stringify(judgement.is_aganist_company))
        if(judgement.is_executable)
            formData.append('is_executable'     , JSON.stringify(judgement.is_executable))
        
        if(judgement.is_objectionable)
            formData.append('is_objectionable'  , JSON.stringify(judgement.is_objectionable))


        if(judgement?.attachments?.length)
            for (let attch of judgement?.attachments){
                formData.append('attachments', attch)
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



