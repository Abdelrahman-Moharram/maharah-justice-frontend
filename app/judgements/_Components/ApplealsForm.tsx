import { HijriDateInput, SelectInput, TextArea } from '@/Components/Forms'
import DefaultFormButtons from '@/Components/Forms/DefaultFormButtons'
import { appealFormType } from '@/Components/Types/appeals'
import { ValidationsType } from '@/Components/Types/Others'
import React, { ChangeEvent, FormEvent } from 'react'
import { DateObject } from 'react-multi-date-picker'
interface baseType{
    id: string;
    name: string
}
interface Props{
    appeal: appealFormType
    formErrors:any
    courts:baseType[]
    cities:baseType[]
    onChange:(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType) => void
    selectChange: (e: ChangeEvent<HTMLSelectElement> ) => void,
    // setFormErrors
    isLoading:boolean
    formSubmit:(e:FormEvent)=>void,
    changeDate: (date:DateObject | null) => void,
    add?:boolean
}
const ApplealsForm = ({
    appeal,
    changeDate,
    cities,
    courts,
    formErrors,
    onChange,
    selectChange,
    add,
    formSubmit,
    isLoading
    }:Props) => {
    
  return (
    <form 
        encType='multipart/form-data'
        onSubmit={formSubmit}
        method='post'
    >
        <div className='grid grid-cols-2 gap-3'>
            <div className="mb-3 col-span-2">
                <HijriDateInput
                    label='تاريخ الإعتراض'
                    labelId='date_ar'
                    onChange={changeDate}
                    value={appeal.date_ar}
                    errors={formErrors?.date_ar}
                    required
                />
            </div>
            <div className="mb-3">
                <SelectInput
                    label='المحكمة'
                    labelId='court'
                    value={appeal?.court}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={formErrors?.court}
                >
                {
                    courts?.length?
                        courts.map(court=>(
                            <option key={court.id} value={court.id}>{court.name}</option>   
                        ))
                    :
                    null
                }    
                </SelectInput>
            </div>
            <div className="mb-3">
                <SelectInput
                    label='المدينة'
                    labelId='city'
                    value={appeal?.city}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={formErrors?.city}
                >
                {
                    cities?.length?
                        cities.map(city=>(
                            <option key={city.id} value={city.id}>{city.name}</option>   
                        ))
                    :
                    null
                }    
                </SelectInput>
            </div>

            <div className='col-span-2'>
                <TextArea 
                    labelId='result'
                    label='نص الإعتراض'
                    onChange={onChange}
                    value={appeal?.result}
                    required={true}
                    errors={formErrors?.result}
                />
            </div>
            
        </div>
        <div className="mt-12">
            <DefaultFormButtons
                isLoading={isLoading}
                cancelHref='/cases'
            />
        </div>
    </form>
  )
}

export default ApplealsForm
