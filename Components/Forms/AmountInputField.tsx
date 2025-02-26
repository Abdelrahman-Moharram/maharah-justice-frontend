import React, { ChangeEvent, useEffect, useState } from 'react'
import { numberToMoney } from '../utils/helper';
import Input from './Input';

interface props {
	labelId: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	value: string | number | null;
	label: string,
    currency?:string,
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[]
    defaultValue?:string|number,
	placeholder?: string
}
const AmountInputField = ({
    labelId,
	onChange,
	value,
	label,
	placeholder,
	required = false,
    defaultValue,
    errors,
    currency='ر.س',
}: props) => {
    const [amountValue, setAmountValue] = useState<number|string>('')
    useEffect(()=>{setAmountValue(numberToMoney(value))}, [value])

    const handleAmountValue = (e:ChangeEvent<HTMLInputElement>) =>{
        setAmountValue(numberToMoney(e.target.value))
        e.target.value = e.target.value.replace(/[^0-9.]/g, '')
        onChange(e)        
    }
  return (
    <div className="relative">
        <Input
            type={'text'}
            label={label}
            labelId={labelId}
            errors={errors}
            onChange={handleAmountValue}
            value={amountValue?.toString()}
            defaultValue={defaultValue}
            required={required}
            placeholder={placeholder}
            
        />
        <span 
            className='absolute end-2 font-bold text-sm top-[40px] p-1 transition-all bg-container rounded-lg drop-shadow-sm'
        >
            {currency}
        </span>
    </div>
  )
}

export default AmountInputField
