'use client'
import { ChangeEvent, useState } from "react"

import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"
import { ExecutionFormType } from "@/Components/Types/Executions"
import { useGetExecutionsFormDropdownsQuery } from "@/redux/api/JudgementsApi"
import { DateObject } from "react-multi-date-picker"
import arabic_en from "react-date-object/locales/arabic_en"


export default function useExecutionsForm({judgement_number, exec_number}:{judgement_number?:string, exec_number:string}){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetExecutionsFormDropdownsQuery(undefined)
    // const [editExecutionForm] = useEditExecutionFormMutation()
    const [form, setForm] = useState<ExecutionFormType>({
        number:'',
        city:'',
        state:'',
        execution_type:'',
        action:'',
        notes:'',
        date_ar:null
    })

    // useEffect(()=>{
    //     if(number){
    //         editExecutionForm({number})
    //         .then(res=>{
    //             setForm(res?.data?.form)
    //             setForm(prev=>({...prev, amount: parseFloat(res?.data?.form?.amount)}))
    //         })
    //     }
    // },[number])
    
    
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;       
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setForm({ ...form, [name]: value });
    };
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setForm({ ...form, [name]: value });
    }

    

    const changeDate = (date:DateObject | null, validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, last_date_to_appeal:DefaultInputValidate({name:'last_date_to_appeal', value:date||"", validationSchema})})
        setForm({ ...form, date_ar: date });
    }

    

    const getExecutionAsFormData = () =>{
        
        const formData = new FormData()
        formData.append('number'                , form.number)
        formData.append('city'                  , form.city)
        formData.append('state'                 , form.state)
        formData.append('execution_type'        , form.execution_type)
        formData.append('date_ar'               , form.date_ar?.setLocale(arabic_en).toString()??'')
        formData.append('action'                , form.action)
        formData.append('notes'                 , form.notes)
        formData.append('notes'                 , form.notes)

        // if(form?.attachments?.length)
        //     for (let attch of form?.attachments){
        //         formData.append('attachments', attch)
        //     }

        return formData
    }

    return {
        form,
        formErrors,
        dropDowns,
        onChange,
        changeDate,
        selectChange,
        // imageChange,
        // changeCheckBox,
        setFormErrors,
        getExecutionAsFormData
    }
    
}



