import React from 'react'
import DatePicker, { DateObject } from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic"
import arabic_ar from "react-date-object/locales/arabic_ar"
import 'react-datepicker/dist/react-datepicker.css';

interface props {
	labelId: string;
	onChange: (date:DateObject | null) => void;
	value: DateObject | null | undefined;
	label: string
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[],
    editable?:boolean
}
const HijriDateInput = ({
    labelId,
	onChange,
	value,
	label,
	required = false,
    children,
    errors,
    editable=true
}: props) => {
    
  return (
    <div className='p-0'>
        <label 
            htmlFor={labelId}
            className={"block text-md font-medium shadow-none mb-1 drop-shadow-none outline-hidden text-gray-700 "+ (errors?.length?"border-red-500":" border-none ")}
        >
            {label} 
        </label>
        {
            editable?
                <DatePicker
                    format="DD-MM-YYYY"
                    inputClass={"mt-1 w-full py-2 px-4 bg-card border border-[#E3E5E5] rounded-xl outline-hidden "+ (errors?.length?"border-red-500":"  ")}
                    placeholder={""}
                    value={value}
                    calendar={arabic}
                    containerClassName='z-100 w-full'
                    calendarPosition='bottom-right'
                    required={required}
                    locale={arabic_ar}
                    onChange={onChange}
                    editable={editable}
                />
            :
                <div className={"mt-2 w-full py-2 px-4 bg-gray-200 border border-[#E3E5E5] rounded-xl outline-hidden "+ (errors?.length?"border-red-500":"  ")}>
                    {value?.format('DD-MM-YYYY')||''}
                </div>
        }
            
        {children}
        <div className="absolute">
            {
                errors?.map(error=>
                    <span key={error} className='text-red-500 block'>{error}</span>
                )
            }
        </div>
    </div>
      
  )
}

export default HijriDateInput
