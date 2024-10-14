'use client'
import React, { ChangeEvent, useState } from 'react'
import { FaEye } from 'react-icons/fa';

interface props {
	labelId: string;
	type: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	value: string | number;
	label: string
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[]
    defaultValue?:string|number
}

const FloatingInput = ({
    labelId,
	type,
	onChange,
	value,
	label,
	required = false,
    children,
    defaultValue,
    errors
}: props) => {
    const [inputType, setType] = useState(type)
  return (
    <>
        <label
            htmlFor={labelId}
            className={"relative block rounded-md border "+ (errors?.length?"border-red-500":" ")}
        >
            <input
                type={inputType}
                name={labelId}
                id={labelId}
                onChange={onChange}
                value={value}
                defaultValue={defaultValue}
                required={required}
                placeholder=''
                className="[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none py-2 px-3 peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-container py-0 px-2  text-md transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    {label}
                </span>
                {
                    type === 'password'?
                        <button 
                            type='button'
                            onClick={()=>setType(inputType === 'text'?'password':'text')}
                            className='absolute end-1 rounded-full top-1 p-2 hover:bg-gray-100'
                        >
                            <FaEye />
                        </button>
                    :null
                }
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

export default FloatingInput
