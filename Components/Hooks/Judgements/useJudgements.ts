'use client'
import arabic_en from "react-date-object/locales/arabic_en"
import { useGetSessionFormDropDownsQuery } from "@/redux/api/utilsApi"
import { ChangeEvent, useEffect, useState } from "react"

import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"
import { JudgementsFormType } from "@/Components/Types/Judgements"
import { useEditJudgementFormMutation } from "@/redux/api/JudgementsApi"


export default function useJudgementsForm({case_number, number}:{case_number:string, number?:string}){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetSessionFormDropDownsQuery(undefined)
    const [editJudgementForm] = useEditJudgementFormMutation()
    const [judgement, setJudgement] = useState<JudgementsFormType>({
        case_number:case_number,
        number:'',
        court:'',
        amount:0,
        // date_ar:null,
        notes:'',
        result:'',
        is_aganist_company:false, 
        is_executable:false, 
        is_objectionable:false, 
        judgement_attachments:[]
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
        formData.append('number'                , judgement.number)
        formData.append('case_number'           , judgement.case_number)
        formData.append('court'                 , judgement.court)
        formData.append('amount'                , String(judgement.amount))
        formData.append('notes'                 , judgement.notes)
        formData.append('result'                , judgement.result)
        formData.append('is_aganist_company'    , JSON.stringify(judgement.is_aganist_company))
        if(judgement.is_executable)
            formData.append('is_executable'         , JSON.stringify(judgement.is_executable))
        
        if(judgement.is_objectionable)
            formData.append('is_objectionable'      , JSON.stringify(judgement.is_objectionable))

        // formData.append('date_ar'        , judgement.date_ar?.setLocale(arabic_en).toString()??'')
        

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
        // changeDate,
        selectChange,
        imageChange,
        changeCheckBox,
        setFormErrors,
        getJudgementAsFormData
    }
    
}