import React, { ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import DatePicker from "react-datepicker";
import moment from "moment-hijri";

interface props {
	labelId: string;
	handleDate: (date:Date, event:) => void;
	value: string | number;
	label: string
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[]
    defaultValue?:string|number
}
const HijriDateInput = ({
    labelId,
	handleDate,
	value,
	label,
	required = false,
    children,
    defaultValue,
    errors
}: props) => {
    
  return (
    <>
        <label
            htmlFor={labelId}
            className={"relative block rounded-md border "+ (errors?.length?"border-red-500":" ")}
        >
            
            <DatePicker 
                type={'text'}
                name={labelId}
                id={labelId}
                onChange={handleDate}
                value={moment()}
                adjustDateOnChange
                // date={value}
                selected={moment()}
                calendar="hijri"
                defaultValue={defaultValue}
                required={required}
                placeholder=''
                className="[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none py-2 px-3 peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                selectedDate="1439/08/02" 
                dateFormat="iYYYY/iMM/iDD" 
            />
            <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-container py-0 px-2  text-md transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
                {label}
            </span>
            {children}
        </label>
        {
            errors?.map(error=>
                <span key={error} className='text-red-500 block'>{error}</span>
            )
        }
    </>
      
  )
}

export default HijriDateInput
