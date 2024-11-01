import React, { ChangeEvent } from 'react'

interface props {
	labelId: string;
	children: React.ReactNode;
	onChange: (e:ChangeEvent<HTMLSelectElement>) => void;
	value: string;
	label: string
	required?: boolean;
    emptyoption?:boolean;
    errors?: []
}

const SelectInput = ({
    labelId,
	children,
	onChange,
	value,
    label,
	required = false,
    emptyoption = true,
    errors
}: props) => {
  return (
    <div className='p-0'>
        <label 
            htmlFor={labelId}
            className={"block text-md font-medium shadow-none drop-shadow-none outline-none text-gray-700 "+ (errors?.length?"border-red-500":" border-none ")}
        > 
            {label} 
        </label>
        <select
            name={labelId}
            id={labelId}
            onChange={onChange}
            value={value}
            required={required}
            className={"mt-1 w-full py-1 px-4 bg-card border-[#F8F8F8] border rounded-xl outline-none "+ (errors?.length?"border-red-500":" border-none ")}
            >
            {
                emptyoption?
                    <option value=""></option>
                :null
            }
            {children}
        </select>

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

export default SelectInput
