import React, { ChangeEvent, useEffect, useState } from 'react'

import { useSearchLawyerByNameMutation } from '@/redux/api/utilsApi'
import { Input } from '@/Components/Forms';


interface customerType{
    id: string;
    full_name: string;
}
interface Props{
    label       :string
    labelId     :string
    type        :string
    onChange:(val:string)=>void | undefined;
    exclude?: string,
    oldNameValue:string,
    required?:boolean
}
const LawyerSearchInput = ({
    label,
    labelId,
    exclude,
    type,
    onChange,
    oldNameValue,
    required=true
}:Props) => {
    const [nameValue, setNameValue] = useState<string>(oldNameValue)
    const [menu, setMenu] = useState(false)
    const [searchCustomer, {data}] = useSearchLawyerByNameMutation()
    
    useEffect(()=>{
      setNameValue(nameValue)
    },[oldNameValue])

    useEffect(()=>{
      if(nameValue || oldNameValue){       
        searchCustomer({query:nameValue || oldNameValue, exclude:exclude||''})
      }
    },[nameValue, oldNameValue])

    const handleNameValue = (e:ChangeEvent<HTMLInputElement>) =>{
      setNameValue(e.target.value)
      setMenu(true)
    }
    
    const handleValues = ({name, id}:{name:string, id: string}) =>{
      setNameValue(name)
      onChange(id)
      setMenu(false)      
    }
    

  return (
    <div className='relative'>
      <Input
        label={label}
        labelId={labelId}
        onChange={handleNameValue}
        type={type}
        value={nameValue || oldNameValue}
        required={required}
      />
      {
        data?.lawyers?.length && (nameValue || oldNameValue) && menu  ?
        <div className='w-full absolute z-[100] max-h-[500px] overflow-y-auto bg-gray-100 p-1 space-y-2 rounded-md'>
        {
            data?.lawyers.map((customer:customerType)=>(
                <div 
                  className="bg-container hover:bg-card transition-all w-full p-2 rounded-md cursor-pointer"
                  onClick={()=>handleValues({name: customer.full_name, id: customer.id})}
                >
                  {customer.full_name}
                </div>
            ))
        }
        </div>
      :null
      }
    </div>
  )
}

export default LawyerSearchInput