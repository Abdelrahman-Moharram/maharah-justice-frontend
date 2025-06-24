import React, { ChangeEvent } from 'react'

interface Props{
  checked: boolean,
  changeCheckBox: (event: ChangeEvent<HTMLInputElement> )=>void
  label: string,
  labelId: string,
  name: string,
  errors?:any[]

}
const CheckBox = ({checked, changeCheckBox, label, labelId, name, errors}:Props) => {
  return (
    <>
      <label
        htmlFor={labelId}
        className="flex cursor-pointer border border-[#E3E5E5] items-start gap-4 rounded-lg hover:bg-gray-100 py-2 px-4 transition bg-card "
      > 
        <div className="flex items-center">
          &#8203;
          <input checked={checked} name={name} onChange={changeCheckBox} type="checkbox" className="size-4 rounded-sm border" id={labelId} />
        </div>

        <div>
          <strong className="font-medium "> {label}</strong>
        </div>
      </label>
      {
				typeof(errors) === 'string'?
					<div className="mb-3">
							<div className="absolute">
								<span key={errors} className='text-red-500 block'>{errors}</span>
							</div>
					</div>
				:
					errors?.length?
						<div className="mb-3">
							<div className="absolute">
								{
									errors?.map(error=>
										<span key={error} className='text-red-500 block'>{error}</span>
									)
								}
							</div>
						</div>
					:null
			}
    </>
  )
}

export default CheckBox
