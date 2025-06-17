import React, { ChangeEvent } from 'react'
import Input from './Input'

interface props {
	labelId: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	value: string | null;
	label: string,
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[]
	placeholder?: string
}
const PhoneNumberInputField = ({
    labelId,
	onChange,
	value,
	label,
	placeholder,
	required = false,
    errors,
}: props) => {
  return (
    <div className="relative">
        <Input
            type={'text'}
            label={label}
            labelId={labelId}
            errors={errors}
            onChange={onChange}
            value={value}
            required={required}
            placeholder={placeholder}
        />
        <span 
            className='absolute end-2 font-bold text-sm top-[40px] p-1 transition-all rounded-lg drop-shadow-sm'
        >
            966+
        </span>
    </div>
  )
}

export default PhoneNumberInputField
