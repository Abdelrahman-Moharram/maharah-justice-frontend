import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from '@/Components/Forms';
import { ValidationsType } from '@/Components/Types/Others';
import { useSearchLawyerByNameMutation } from '@/redux/api/accountsApi';
import { MdPersonSearch } from 'react-icons/md';


interface lawyerType{
    id: string;
    full_name: string;
}
interface Props{
    label       :string
    labelId     :string
    type        :string
    onChange:(val:string, name:string, validationSchema?:ValidationsType)=>void | undefined;
    exclude?: string,
    oldNameValue:string,
    required?:boolean,
    is_consultant?:boolean,
    errors?:any[]

}
const LawyerSearchInput = ({
    label,
    labelId,
    exclude,
    type,
    onChange,
    oldNameValue,
    required=true,
    is_consultant=false,
    errors
}:Props) => {
    const [nameValue, setNameValue] = useState<string>(oldNameValue)
    const [menu, setMenu] = useState(false)
    const [searchLawyer, {data}] = useSearchLawyerByNameMutation()
    
    useEffect(()=>{
      setNameValue(nameValue||oldNameValue)
    },[oldNameValue])
    
    useEffect(()=>{
      if(nameValue || oldNameValue){    
        console.log(nameValue, oldNameValue);
           
        searchLawyer({query:nameValue || oldNameValue, exclude:exclude||'', is_consultant})
      }
    },[nameValue, oldNameValue])

    const handleNameValue = (e:ChangeEvent<HTMLInputElement>) =>{
      setNameValue(e.target.value)
      setMenu(true)
    }
    
    const handleValues = ({name, id}:{name:string, id: string}) =>{
      setNameValue(name)
      onChange(id, labelId)
      setMenu(false)      
    }
    
  return (
    <div className='relative'>
      <Input
        label={label}
        labelId={labelId}
        onChange={handleNameValue}
        type={type}
        defaultValue={nameValue || oldNameValue}
        value={nameValue}
        required={required}
        errors={errors}
      />
      <div 
        className='absolute end-2.5 rounded-full text-lg top-10 p-1.5 transition-all'
      >
        <MdPersonSearch />
      </div>
      {
        data?.lawyers?.length && (nameValue || oldNameValue) && menu  ?
        <div className='w-full absolute z-[100] max-h-[500px] overflow-y-auto bg-gray-100 p-1 space-y-2 rounded-md'>
        {
            data?.lawyers.map((lawyer:lawyerType)=>(
                <div 
                  key={lawyer?.id}
                  className="bg-container hover:bg-card transition-all w-full p-2 rounded-md cursor-pointer"
                  onClick={()=>handleValues({name: lawyer.full_name, id: lawyer.id})}
                >
                  {lawyer.full_name}
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