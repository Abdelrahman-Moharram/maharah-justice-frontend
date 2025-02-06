'use client'
import arabic_en from "react-date-object/locales/arabic_en"
import { useGetSessionFormDropDownsQuery } from "@/redux/api/utilsApi"
import { ChangeEvent, useEffect, useState } from "react"
import { DateObject } from "react-multi-date-picker"
import { useEditSessionFormMutation, useGetConsultationsTypesQuery } from "@/redux/api/sessionsApi"
import { addCosultationType, SessionFormType } from "@/Components/Types/sessions"
import arabic_ar from "react-date-object/locales/arabic_ar"
import arabic from "react-date-object/calendars/arabic"
import { ValidationsType } from "@/Components/Types/Others"
import { DefaultInputValidate } from "../Common/useValidations"



export default function useSessionForm({case_number, id}:{case_number:string, id?:string}){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetSessionFormDropDownsQuery(undefined)
    const [editSessionForm] = useEditSessionFormMutation()
    // const {case_number, id}:{case_number:string, id:string} = useParams() // to be removed
    
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
        can_edit_all_data:true,
        attachments:[]
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
    const changeLawyer = (val:string, name:string,  validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, lawyer:DefaultInputValidate({name, value:val, validationSchema})})
        setSession({ ...session, [name]: val })
    }
    const imageChange = (file:File)=>{
        if(session.attachments?.length)
            ({ ...session, attachments: [...session.attachments, file] });
        else
            setSession({ ...session, attachments: [file] });
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
    
        if(session?.attachments?.length)
            for (let attch of session?.attachments){
                formData.append('attachments', attch)
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


export function useAddConsultationsForm({session_id}:{session_id:string}){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetConsultationsTypesQuery(undefined)
    const [form, setForm] = useState<addCosultationType>({
        message :'',
        receiver:'',
        receiver_name:'',
        type:''
    })

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setForm({ ...form, [name]: value });
    };
    const changeLawyer = (val:string, name:string,  validationSchema?:ValidationsType)=>{
        if(validationSchema)
            setFormErrors({...formErrors, lawyer:DefaultInputValidate({name, value:val, validationSchema})})
        setForm({ ...form, [name]: val })
    }
    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
        const { name, value } = e.target;        
        if(validationSchema)
            setFormErrors({...formErrors, [name]:DefaultInputValidate({name, value, validationSchema})})
        setForm({ ...form, [name]: value });
    }

    const getAsFormData = () =>{
        const formData = new FormData()
        formData.append('receiver', form.receiver)
        formData.append('message', form.message)
        formData.append('type', form.type)
        

        return formData
    }

    return {
        form,
        formErrors,
        dropDowns,
        onChange,
        selectChange,
        setFormErrors,
        getAsFormData,
        changeLawyer,
    }
}