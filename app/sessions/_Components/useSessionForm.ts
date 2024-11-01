'use client'
import arabic_en from "react-date-object/locales/arabic_en"
import { useGetSessionFormDropDownsQuery } from "@/redux/api/utilsApi"
import { useParams } from "next/navigation"
import { ChangeEvent, useState } from "react"
import Time from "react-datepicker/dist/time"
import { DateObject } from "react-multi-date-picker"

interface SessionType{
    case_number: string,
    court: string,
    city: string,
    state: string,
    date_ar: DateObject | null,
    time: Time | null,
    link: string,
    next_session_req: string,
    notes: string,
    record: string,
    defenses: string,
    lawyer: string,
    alterlawyer: string,
    session_attachments: File[] | null
}

export default function useSessionForm(){
    const [formErrors, setFormErrors] = useState<any>(null)
    const {data:dropDowns} = useGetSessionFormDropDownsQuery(undefined)
    const {case_number}:{case_number:string} = useParams()
    
    const [session, setSession] = useState<SessionType>({
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
        session_attachments:[]
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
        const { name, value } = event.target;
        setSession({ ...session, [name]: value });
    };
    const changeDate = (date:DateObject | null)=>{
        setSession({ ...session, date_ar: date });
    }
    const selectChange = (e: ChangeEvent<HTMLSelectElement> )=>{
        const { name, value } = e.target;        
        setSession({ ...session, [name]: value });
    }
    const changeLawyer = (val:string)=>{
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
        formData.append('alterlawyer', session.alterlawyer)
        formData.append('link', session.link)

        formData.append('notes', session.notes)
        formData.append('defenses', session.defenses)
        formData.append('record', session.record)
        formData.append('next_session_req', session.next_session_req)


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