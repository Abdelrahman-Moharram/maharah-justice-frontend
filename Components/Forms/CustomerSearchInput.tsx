import React, { ChangeEvent, useEffect, useState } from 'react'
import FloatingInput from './FloatingInput'
import { useSearchCustomerByNameMutation } from '@/redux/api/utilsApi'


interface customerType{
    id: string;
    name: string;
}
interface Props{
    label       :string
    labelId     :string
    type        :string
    onChange:(val:string)=>void | undefined;
    exclude?: string[],
    oldNameValue:string
}
const CustomerSearchInput = ({
    label,
    labelId,
    exclude,
    type,
    onChange,
    oldNameValue
}:Props) => {
    const [nameValue, setNameValue] = useState(oldNameValue)
    const [menu, setMenu] = useState(false)
    const [searchCustomer, {data}] = useSearchCustomerByNameMutation()
    
    useEffect(()=>{
      if(nameValue){
        searchCustomer({query:nameValue})
      }
    },[nameValue])

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
    <div>
      <FloatingInput
        label={label}
        labelId={labelId}
        onChange={handleNameValue}
        type={type}
        value={nameValue}
        defaultValue={oldNameValue}
        required
      />
      {
        data?.customers?.length && nameValue && menu  ?
        <div className='w-full max-h-[500px] overflow-y-auto bg-gray-100 p-1 space-y-2  rounded-md mt-1'>
        {
            data?.customers.map((customer:customerType)=>(
                <div 
                    className="bg-white w-full p-2 rounded-md cursor-pointer"
                    onClick={()=>handleValues({name: customer.name, id: customer.id})}
                >
                    {customer.name}
                </div>
            ))
        }
        </div>
      :null
      }
    </div>
  )
}

export default CustomerSearchInput