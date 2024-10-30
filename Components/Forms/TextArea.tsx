import React, { ChangeEvent } from 'react'

interface props {
	labelId: string;
	onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void;
	value: string;
	label: string
	required?: boolean;
    errors?: []
}

const Textarea = ({labelId,
	onChange,
	value,
	label,
	required = false,
    errors
}: props) => {
  return (
    <div className=' p-0'>
        <label 
            htmlFor={labelId}
            className={"block text-md font-medium shadow-none drop-shadow-none outline-none text-gray-700 "+ (errors?.length?"border-red-500":" border-none ")}
        > 
            {label} 
        </label>
        <textarea
            name={labelId}
            rows={4}
            id={labelId}
            required={required}
            className={"mt-1 resize-none w-full py-2 px-4 bg-card border-[#F8F8F8] border rounded-xl outline-none "+ (errors?.length?"border-red-500":" border-none ")}
            defaultValue={value}
            onChange={onChange}
        >
        </textarea>
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

export default Textarea
