import React, { ChangeEvent, FormEvent, useState } from 'react'
import HijriDateInput from '@/Components/Forms/HijriDateInput'
import { DateObject } from 'react-multi-date-picker'
import { ImageInput, Input } from '@/Components/Forms'
import LawyerSearchInput from './Inputs/LawyerSearchInput'
import SelectInput from '@/Components/Forms/SelectInput'
import Textarea from '@/Components/Forms/TextArea'
import Button from '@/Components/Common/Button'
import Link from 'next/link'
import { SessionFormType } from '@/Components/Types/sessions'
import { ValidationsType } from '@/Components/Types/Others'
import DynamicFilesField from '@/Components/Forms/DynamicFilesField'

interface baseType{
    id: string;
    name: string
}
interface Props{
    session: SessionFormType
    formErrors: any,
    courts: baseType[],
    cities: baseType[],
    states: baseType[],
    add:boolean,
    isLoading:boolean,
    formSubmit:(e:FormEvent<HTMLFormElement>) =>void
    changeDate: (date:DateObject | null) => void,
    onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType) => void,
    selectChange: (e: ChangeEvent<HTMLSelectElement> ) => void,
    changeLawyer:(val:string, name:string,  validationSchema?:ValidationsType)=>void
    imageChange:(file:File)=>void
}
const SessionForm = ({
    session,
    formErrors, 
    courts,
    cities,
    states,
    add,
    isLoading,
    changeDate,
    onChange,
    selectChange,
    changeLawyer,
    imageChange,
    formSubmit,
}:Props) => {
    const [file, setFile] = useState<File|null>(null)
    
    const changeCurrentFile = (e:ChangeEvent<HTMLInputElement> ) =>{
        const files = e.target.files
        if (files?.length && imageChange){
            imageChange(files[0])
            setFile(null)
        }
    }
  return (
    <form 
        encType='multipart/form-data'
        onSubmit={formSubmit}
        method='post'
    >
        <div className="grid grid-cols-2 drop-shadow-md p-5 gap-4 ">
            <div className="">
                <HijriDateInput
                    labelId={'date_ar'}
                    onChange={changeDate}
                    value={session?.date_ar}
                    label={'تاريخ الجلسة'}
                    required= {true}
                    errors={formErrors?.date_ar}
                />
            </div>
            <div className="">
                <Input 
                    type='time'
                    labelId='time'
                    label='وقت الجلسة'
                    onChange={onChange}
                    value={session?.time??''}
                    required
                    errors={formErrors?.time}
                />
            </div>
            <div className="mb-3">
                <SelectInput
                    label='المحكمة'
                    labelId='court'
                    value={session?.court}
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
                    value={session?.city}
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
            
            
            <div className="mb-3">
                <LawyerSearchInput 
                    type='text'
                    labelId='lawyer'
                    label='المحامي'
                    onChange={changeLawyer}
                    oldNameValue={session?.lawyer_name}
                    errors={formErrors?.lawyer}
                />
            </div>
            <div className="mb-3">
                <LawyerSearchInput 
                    type='text'
                    labelId='alterlawyer'
                    label='المحامي البديل'
                    onChange={changeLawyer}
                    oldNameValue={session?.alterlawyer_name}
                    exclude={session?.lawyer}
                    required={false}
                    errors={formErrors?.alterlawyer}
                />
            </div>

            <div className="mb-3">
                <SelectInput
                    label='حالة الجلسة'
                    labelId='state'
                    value={session?.state}
                    required={true}
                    onChange={selectChange}
                    emptyoption={true}
                    errors={formErrors?.state}
                >
                {
                    states?.length?
                        states.map(state=>(
                            <option key={state.id} value={state.id}>{state.name}</option>   
                        ))
                    :
                    null
                }    
                </SelectInput>
            </div>
            <div className="mb-3">
                <Input 
                    type='url'
                    labelId='link'
                    label='رابط الجلسة'
                    onChange={e=>onChange(e, {regex:{value:'(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})', message:'برجاء إدخال رابط جلسة صالح'}})}
                    value={session?.link??''}
                    errors={formErrors?.link}
                />
            </div>

            {
                !add && session.date && new Date() > new Date(session.date)?
                    <>
                        <div className="">
                            <Textarea 
                                labelId='record'
                                label='الضبط'
                                onChange={onChange}
                                value={session?.record}
                                required={false}
                                errors={formErrors?.record}
                            />
                        </div>
                        <div className="">
                            <Textarea 
                                labelId='next_session_req'
                                label='طلبات الجلسة القادمة'
                                onChange={onChange}
                                value={session?.next_session_req}
                                required={false}
                                errors={formErrors?.next_session_req}
                            />
                        </div>
                    </>
                :null
            }
            <div className="">
                <Textarea 
                    labelId='notes'
                    label='الملاحظات'
                    onChange={onChange}
                    value={session?.notes}
                    required={false}
                    errors={formErrors?.notes}
                />
            </div>
            <div className="">
                <Textarea 
                    labelId='defenses'
                    label='الدفوع'
                    onChange={onChange}
                    value={session?.defenses}
                    required={false}
                    errors={formErrors?.defenses}
                />
            </div>
        </div>
        <div className="">
            <h3>مستندات الجلسة</h3>
            <DynamicFilesField
                errors={formErrors?.attachments}
                attachments={session?.attachments}
                imageChange={imageChange}
            />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
            <Button submit className='bg-primary hover:bg-transparent border-primary' title={'حفظ'} isLoading={isLoading} />
            <Link 
                href={'/cases'} 
                className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
            >
                إلغاء
            </Link>
      </div>
    </form>

  )
}

export default SessionForm
