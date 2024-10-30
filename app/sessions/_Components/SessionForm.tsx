import React, { ChangeEvent, useState } from 'react'
import HijriDateInput from '@/Components/Forms/HijriDateInput'
import { DateObject } from 'react-multi-date-picker'
import { ImageInput, Input } from '@/Components/Forms'
import Time from 'react-datepicker/dist/time'
import LawyerSearchInput from './Inputs/LawyerSearchInput'
import SelectInput from '@/Components/Forms/SelectInput'
import Textarea from '@/Components/Forms/TextArea'

interface SessionType{
    case_number: string,
    court: string,
    city: string,
    date_ar: DateObject | null,
    time: Time | null,
    link: string,
    next_session_req: string,
    notes: string,
    record: string,
    defenses: string,
    lawyer: string,
    alterlawyer: string,
    session_attachments: File[] | null,
}
interface baseType{
    id: string;
    name: string
}
interface Props{
    session: SessionType
    formErrors: any,
    changeDate: (date:DateObject | null) => void,
    onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    selectChange: (e: ChangeEvent<HTMLSelectElement> ) => void,
    courts: baseType[],
    cities: baseType[],
    changeLawyer:(val:string)=>void
    add:boolean,
    imageChange:(file:File)=>void
}
const SessionForm = ({
    session,
    formErrors, 
    changeDate,
    onChange,
    selectChange,
    courts,
    cities,
    changeLawyer,
    imageChange,
    add
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
    <>
        <div className="grid grid-cols-2 drop-shadow-md p-5 gap-4 ">
            <div className="mb-3">
                <HijriDateInput
                    labelId={'date_ar'}
                    onChange={changeDate}
                    value={session?.date_ar}
                    label={'تاريخ القضية'}
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
                    oldNameValue={session?.lawyer}
                    // errors={formErrors?.lawyer}
                />
            </div>
            <div className="mb-3">
                <LawyerSearchInput 
                    type='text'
                    labelId='alterlawyer'
                    label='المحامي البديل'
                    onChange={changeLawyer}
                    oldNameValue={session?.alterlawyer}
                    exclude={session?.lawyer}
                    // errors={formErrors?.lawyer}
                />
            </div>

            <div className="mb-3 col-span-2">
                <Input 
                    type='url'
                    labelId='link'
                    label='رابط الجلسة'
                    onChange={onChange}
                    value={session?.link??''}
                    required
                    errors={formErrors?.link}
                />
            </div>

            {
                !add?
                    <>
                        <div className="">
                            <Textarea 
                                labelId='record'
                                label='الضبط'
                                onChange={onChange}
                                value={session?.record}
                                required
                                errors={formErrors?.record}
                            />
                        </div>
                        <div className="">
                            <Textarea 
                                labelId='next_session_req'
                                label='طلبات الجلسة القادمة'
                                onChange={onChange}
                                value={session?.next_session_req}
                                required
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
                    required
                    errors={formErrors?.notes}
                />
            </div>
            <div className="">
                <Textarea 
                    labelId='defenses'
                    label='الدفوع'
                    onChange={onChange}
                    value={session?.defenses}
                    required
                    errors={formErrors?.defenses}
                />
            </div>
        </div>
        <div className="">
            <h3>مستندات الجلسة</h3>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 sm-grid-cols-2 gap-3 items-center">
                    {
                        session?.session_attachments?.length?
                            session.session_attachments?.map((attch:File|string, idx)=>(
                                <div className="" key={idx}>
                                    <ImageInput
                                        labelId={'image'}
                                        type={'file'}
                                        onChange={changeCurrentFile}
                                        file={attch}
                                        label={`المرفق رقم(${idx})`}
                                        required= {false}
                                        errors={formErrors?.attch}
                                    />
                                </div>
                            ))
                        :null
                    }

                    <div className="">
                        <ImageInput
                            labelId={'image'}
                            type={'file'}
                            onChange={changeCurrentFile}
                            file={file}
                            label={`إضافة مرفق`}
                            required= {false}
                            // errors={errors?.attch}
                        />
                    </div>
                </div>
        </div>
    </>

  )
}

export default SessionForm
