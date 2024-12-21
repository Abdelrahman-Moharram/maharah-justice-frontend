import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from '@/Components/Forms';
import { ValidationsType } from '@/Components/Types/Others';
import { useSearchUserByNameOrUserNameMutation } from '@/redux/api/accountsApi';


interface userType{
    id: string;
    full_name: string;
}
interface Props{
    label       :string
    labelId     :string
    onChange:(val:string, name:string, validationSchema?:ValidationsType)=>void | undefined;
    exclude?: string,
    oldNameValue:string,
    required?:boolean,
    errors?:any[]

}
const UserSearchInputField = ({
    label,
    labelId,
    exclude,
    onChange,
    oldNameValue,
    required=true,
    errors
}:Props) => {
    const [nameValue, setNameValue] = useState<string>(oldNameValue)
    const [menu, setMenu] = useState(false)
    const [searchUser, {data}] = useSearchUserByNameOrUserNameMutation()
    
    useEffect(()=>{
      setNameValue(nameValue||oldNameValue)
    },[oldNameValue])
    
    useEffect(()=>{
      if(nameValue || oldNameValue){       
        searchUser({query:nameValue || oldNameValue, exclude:exclude||''})
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
        type={'string'}
        defaultValue={nameValue || oldNameValue}
        value={nameValue}
        required={required}
        errors={errors}
      />
      {
        data?.users?.length && (nameValue || oldNameValue) && menu  ?
        <div className='w-full absolute z-[100] max-h-[500px] overflow-y-auto bg-gray-100 p-1 space-y-2 rounded-md'>
        {
            data?.users.map((user:userType)=>(
                <div 
                  key={user?.id}
                  className="bg-container hover:bg-card transition-all w-full p-2 rounded-md cursor-pointer"
                  onClick={()=>handleValues({name: user.full_name, id: user.id})}
                >
                  {user.full_name}
                </div>
            ))
        }
        </div>
      :null
      }
    </div>
  )
}

export default UserSearchInputField