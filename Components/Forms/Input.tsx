'use client'
import React, { ChangeEvent, useState } from 'react'
import Time from 'react-datepicker/dist/time';
import { FaEye } from 'react-icons/fa';

interface props {
	labelId: string;
	type: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	value: string | number | Time | null;
	label: string
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[]
    defaultValue?:string|number
}

const Input = ({
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
		<div className=' p-0'>
			<label 
				htmlFor={labelId}
            	className={"block text-md font-medium  text-gray-700 "+ (errors?.length?"border-red-500":" border-none ")}
			> 
				{label} 
			</label>
			
			<input
                type={inputType}
                name={labelId}
                id={labelId}
                onChange={onChange}
                value={value?.toString()}
                defaultValue={defaultValue}
                required={required}
                placeholder=''
				className={"mt-1 w-full py-2 px-4 bg-card border-[#F8F8F8] border rounded-xl outline-none "+ (errors?.length?"border-red-500":" border-none ")}
			/>
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
			<div className="absolute">
				{
					errors?.map(error=>
						<span key={error} className='text-red-500 block'>{error}</span>
					)
				}
			</div>
		</div>
	);
}

export default Input