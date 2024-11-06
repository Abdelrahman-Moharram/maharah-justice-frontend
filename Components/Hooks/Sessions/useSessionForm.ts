'use client'
import arabic_en from "react-date-object/locales/arabic_en"
import { useGetSessionFormDropDownsQuery } from "@/redux/api/utilsApi"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { DateObject } from "react-multi-date-picker"
import { useEditSessionFormMutation } from "@/redux/api/sessionsApi"
import { SessionFormType } from "@/Components/Types/sessions"
import arabic_ar from "react-date-object/locales/arabic_ar"

import arabic from "react-date-object/calendars/arabic"
import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"


export default function useSessionForm(){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetSessionFormDropDownsQuery(undefined)
    const [editSessionForm] = useEditSessionFormMutation()
    const {case_number, id}:{case_number:string, id:string} = useParams()
    
    const [session, setSession] = useState<SessionFormType>({
        case_number:case_number,
        court:'',
        city:'',
        state:'',
        date_ar:null,
        time:null,
        link:'',
        next_session_req:'',
        notes:'',
        record:'',
        defenses:'',
        lawyer:'',
        alterlawyer:'',
        lawyer_name:'',
        alterlawyer_name:'',
        session_attachments:[]
    })
    useEffect(()=>{
        
        if(id){
            editSessionForm({id})
            .then(res=>{
                setSession(res?.data?.session)      
                const date = new DateObject({ date: res?.data?.session?.date_ar, format:'DD-MM-YYYY', calendar:arabic, locale:arabic_ar })
                setSession(prev=>({...prev, date_ar: date}))          
            })
        }
    },[id])
    
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setSession({ ...session, [name]: value });
    };
    const changeDate = (date:DateObject | null, validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, date_ar:DefaultInputValidate({name:'date_ar', value:date||"", validationSchema})})
        setSession({ ...session, date_ar: date });
    }
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setSession({ ...session, [name]: value });
    }
    const changeLawyer = (val:string,  validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, lawyer:DefaultInputValidate({name:'lawyer', value:val, validationSchema})})
        setSession({ ...session, lawyer: val })
    }
    const imageChange = (file:File)=>{
        if(session.session_attachments?.length)
            ({ ...session, session_attachments: [...session.session_attachments, file] });
        else
            setSession({ ...session, session_attachments: [file] });
    }

    const getSessionAsFormData = () =>{
        
        const formData = new FormData()
        formData.append('case_number', session.case_number)
        formData.append('notes', session.notes)
        formData.append('court', session.court)
        formData.append('city', session.city)
        formData.append('state', session.state)
        formData.append('date_ar', session.date_ar?.setLocale(arabic_en).toString()??'')
        formData.append('time', String(session.time))
        formData.append('lawyer', session.lawyer)
        formData.append('link', session.link)

        formData.append('notes', session.notes)
        formData.append('defenses', session.defenses)
        formData.append('record', session.record)
        formData.append('next_session_req', session.next_session_req)

        if(session.alterlawyer)
            formData.append('alterlawyer', session.alterlawyer)
    
        if(session?.session_attachments?.length)
            for (let attch of session?.session_attachments){
                formData.append('session_attachments', attch)
            }

        return formData
    }

    return {
        session,
        formErrors,
        dropDowns,
        case_number,
        onChange,
        changeDate,
        selectChange,
        changeLawyer,
        imageChange,
        setFormErrors,
        getSessionAsFormData
    }
    
}