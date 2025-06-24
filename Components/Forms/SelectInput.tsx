import React, { ChangeEvent } from 'react'

interface props {
	labelId: string;
	children?: React.ReactNode;
	onChange: (e:ChangeEvent<HTMLSelectElement>) => void;
	value: string;
	label: string
	required?: boolean;
    emptyoption?:boolean;
    errors?: [];
    options?:{value:'', label:''}[]
}

const SelectInput = ({
    labelId,
	children,
	onChange,
	value,
    label,
	required = false,
    emptyoption = true,
    errors,
    options
}: props) => {
  return (
    <div className='p-0 '>
        <label 
            htmlFor={labelId}
            className={"block text-md font-medium shadow-none drop-shadow-none outline-hidden text-gray-700 "+ (errors?.length?"border-red-500":" border-none ")}
        > 
            {label} 
        </label>
        <div className="mt-2 px-2 bg-card rounded-xl border border-[#E3E5E5]">
            <select
                    name={labelId}
                    id={labelId}
                    onChange={onChange}
                    value={value}
                    required={required}
					className={" w-full select-wrapper py-1.5 px-5 pl-0 blur-none bg-transparent outline-hidden border-none "+ (errors?.length?"border-red-500":"  ")}
                >
                {
                    emptyoption?
                        <option value=""></option>
                    :null
                }
                {
                    children?
                        children
                    :
                        options?.map(option=>(
                            <option value={option.value} key={option.value}>{option.label}</option>
                        ))
                }
            </select>
        </div>

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
