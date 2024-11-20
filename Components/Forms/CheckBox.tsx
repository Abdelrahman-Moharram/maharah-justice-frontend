import React, { ChangeEvent } from 'react'

interface Props{
    checked: boolean,
    changeCheckBox: (event: ChangeEvent<HTMLInputElement> )=>void
    label: string,
    labelId: string,
    name: string,

}
const CheckBox = ({checked, changeCheckBox, label, labelId, name}:Props) => {
  return (
    <label
      htmlFor={labelId}
      className="flex cursor-pointer border border-[#E3E5E5] items-start gap-4 rounded-lg hover:bg-gray-100 py-2 px-4 transition bg-card "
    > 
      <div className="flex items-center">
        &#8203;
        <input checked={checked} name={name} onChange={changeCheckBox} type="checkbox" className="size-4 rounded border" id={labelId} />
      </div>

      <div>
        <strong className="font-medium "> {label}</strong>
      </div>
    </label>
  )
}

export default CheckBox
