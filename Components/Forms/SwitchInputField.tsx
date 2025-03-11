import React from 'react'

interface Props{
    checked: boolean,
    handleCheck: ()=>void,
    id:string
}
const SwitchInputField = ({checked, handleCheck, id}:Props) => {
  return (
    <label
        htmlFor={id}
        className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
    >
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleCheck}
            className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
        />
        <span
            className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
        >
            <div data-checked-icon   className='hidden p-3 bg-primary rounded-full'></div>
            <div data-unchecked-icon className='p-3 bg-white rounded-full'></div>
        </span>
    </label>
  )
}

export default SwitchInputField
