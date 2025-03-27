import React, { ChangeEvent, useEffect, useState } from 'react'
import Input from './Input'
import { baseType } from '../Types/Others'

interface Props{
    labelId         : string,
	onChange        : (val:string)=>void | undefined,
    value           : string | number | null,
	label           : string,
	required?       : boolean,
	editable?       : boolean,
    SearchFun       : any,
    searchParams    : any,
    errors          : any,
    icon?           : React.ReactNode
}
const SearchInput = ({value, onChange, SearchFun, searchParams, labelId, label, required, editable, errors, icon}:Props) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchFun, {data}] = SearchFun()
    const changeSearchValue = (e:ChangeEvent<HTMLInputElement>) =>{
        setSearchValue(e?.target?.value)
    }
    const changeMainValue = (item:baseType) =>{
        if(item?.id){
            setSearchValue(item?.name)
            onChange(item?.id)
        }
    }
    useEffect(()=>{
        searchFun({...searchParams, query:searchValue}) 
    },[searchValue])
    
  return (
    <div className='relative'>
      <Input
        label={label}
        labelId={labelId}
        onChange={changeSearchValue}
        type={'text'}
        value={value}
        required={required}
        errors={errors}
        editable={editable}
      />
      <div 
        className='absolute end-2.5 rounded-full text-lg top-10 p-1.5 transition-all'
      >
        {icon}
      </div>
      {
        <div className='w-full absolute z-[100] max-h-[500px] overflow-y-auto bg-gray-100 p-1 space-y-2 rounded-md'>
        {
            data?.items.map((item:baseType)=>(
                <div 
                  key={item?.id}
                  className="bg-container hover:bg-card transition-all w-full p-2 rounded-md cursor-pointer"
                  onClick={()=>changeMainValue(item)}
                >
                  {item?.name}
                </div>
            ))
        }
        </div>
      }
    </div>
  )
}

export default SearchInput
