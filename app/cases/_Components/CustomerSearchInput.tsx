import React, { ChangeEvent, useEffect, useState } from 'react'
import Input from '../../../Components/Forms/Input'
import { useSearchCustomerByNameMutation } from '@/redux/api/utilsApi'


interface customerType{
    id: string;
    name: string;
}
interface Props{
    label         :string
    labelId       :string
    type          :string
    onChange      :(val:string)=>void | undefined;
    exclude?      : string[],
    oldNameValue  :string,
    errors?       :any[]
}
const CustomerSearchInput = ({
    label,
    labelId,
    exclude,
    type,
    onChange,
    oldNameValue,
    errors
}:Props) => {
    const [nameValue, setNameValue] = useState<string>(oldNameValue)
    const [menu, setMenu] = useState(false)
    const [searchCustomer, {data}] = useSearchCustomerByNameMutation()
    
    useEffect(()=>{
      setNameValue(oldNameValue)
    },[oldNameValue])


    useEffect(()=>{
      if(nameValue || oldNameValue){
        searchCustomer({query:nameValue || oldNameValue})
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
    <div className='relative'>
      <Input
        label={label}
        labelId={labelId}
        onChange={handleNameValue}
        type={type}
        value={nameValue}
        defaultValue={oldNameValue}
        required
        errors={errors}
      />
      {
        data?.customers?.length && nameValue && menu  ?
        <div className='w-full absolute z-50 max-h-[500px] overflow-y-auto bg-gray-100 p-1 space-y-2  rounded-md mt-1'>
        {
          data?.customers.map((customer:customerType)=>(
            <div 
              key={customer?.id}
              className="bg-container hover:bg-card transition-all w-full z-50 p-2 rounded-md cursor-pointer"
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