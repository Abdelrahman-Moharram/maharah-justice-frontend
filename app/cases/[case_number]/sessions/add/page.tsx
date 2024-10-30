'use client'
import SessionForm from '@/app/sessions/_Components/SessionForm'
import BasicCard from '@/Components/Cards/BasicCard'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import { useGetSessionFormDropDownsQuery } from '@/redux/api/utilsApi'
import { useParams } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Time from 'react-datepicker/dist/time'
import { DateObject } from 'react-multi-date-picker'
import arabic_en from "react-date-object/locales/arabic_en"

interface SessionType{
  case_number: string,
  court: string,
  city: string,
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

const page = () => {
  const [formErrors, setFormErrors] = useState<any>(null)
  const [session, setSession] = useState<SessionType>({
    case_number:'',
    court:'',
    city:'',
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
  
  // date?.setLocale(arabic_en).date
  // console.log(date?.setLocale(arabic_en).toString());
  const {data:dropDowns, isLoading} = useGetSessionFormDropDownsQuery(undefined)
  const {case_number}:{case_number:string} = useParams()
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
  const BreadcrumbData = [
    {
      href: '/',
      title: 'الصفحة الرئيسية',
    },
    {
      href: '/sessions',
      title: 'الجلسات',
      // icon: <HiBuildingLibrary />
    },
    {
      href: '/sessions/add',
      title: 'إنشاء جلسة',
      current:true
    }
  ]
  const formSubmit = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const formData = new FormData()
    formData.append('case_number', session.case_number)
    formData.append('notes', session.notes)
    formData.append('court', session.court)
    formData.append('city', session.city)
    formData.append('date_ar', session.date_ar?.setLocale(arabic_en).toString()??'')

    if(session?.session_attachments?.length)
      for (let attch of session?.session_attachments){
        formData.append('session_attachments', attch)
      }
    
    console.log(session);
    
    
    
    // createCase({form:formData})
    // .unwrap()
    // .then(data=>{
    //     toast.success(data?.message)
    //     router.push("/cases")
    //   })
    //   .catch((err:any)=>{     
    //     setFormErrors(err.data.errors)
    //   })
    }
  
  return (
    <div className='min-h-[300px] p-5 space-y-4'>
      <Breadcrumb 
        items={BreadcrumbData}
      />
      <div 
        className='grid grid-cols-3 gap-4'
      >
        <BasicCard 
          cardBg='bg-[#F4F4F4]'
          textcolor=''
          title='رقم القضية'
          value={case_number}
        />
        <BasicCard 
          cardBg='bg-[#F4F4F4]'
          textcolor=''
          title='رقم القضية'
          value='4470729987'
        />
        <BasicCard 
          cardBg='bg-[#F4F4F4]'
          textcolor=''
          title='رقم القضية'
          value='4470729987'
        />
      </div>
      <>
        <SessionForm 
          changeDate={changeDate}
          formErrors={formErrors}
          session={session}
          selectChange={selectChange}
          onChange={onChange}
          courts={dropDowns?.courts}
          cities={dropDowns?.cities}
          changeLawyer={changeLawyer}
          imageChange={imageChange}
          add
        />
      </>
    </div>
  )
}

export default page
