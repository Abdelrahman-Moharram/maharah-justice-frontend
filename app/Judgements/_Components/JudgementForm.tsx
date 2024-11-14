import { CheckBox, HijriDateInput, Input, SelectInput, TextArea } from '@/Components/Forms'
import { amountRegex, judgementNumberRegex } from '@/Components/Hooks/Common/validationsRegexRepo';
import { JudgementsFormType } from '@/Components/Types/Judgements'
import { ValidationsType } from '@/Components/Types/Others';
import React, { ChangeEvent, FormEvent } from 'react'
import { DateObject } from 'react-multi-date-picker';
interface baseType{
  id: string;
  name: string
}
interface Props{
  judgement: JudgementsFormType
  formErrors: any,
  courts: baseType[],
  // cities: baseType[],
  // states: baseType[],
  add:boolean,
  isLoading:boolean,
  formSubmit:(e:FormEvent<HTMLFormElement>) =>void
  changeDate: (date:DateObject | null) => void,
  onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType) => void,
  selectChange: (event: ChangeEvent<HTMLSelectElement> ) => void,
  changeCheckBox: (event: ChangeEvent<HTMLInputElement>, validationSchema?:ValidationsType)=>void,
  imageChange:(file:File)=>void
}
const JudgementForm = ({
  judgement,
  formErrors, 
  courts,
  add,
  isLoading,
  changeDate,
  onChange,
  selectChange,
  imageChange,
  changeCheckBox,
  formSubmit,
}:Props) => {

  return (
    <form 
      encType='multipart/form-data'
      onSubmit={formSubmit}
      method='post'
    >
      <div className="grid grid-cols-2 drop-shadow-md p-5 gap-4 ">
        
        <div className="mb-3">
          <Input
            labelId={'number'}
            onChange={e=>onChange(e, {regex:judgementNumberRegex})}
            value={judgement?.number}
            label={'رقم الحكم'}
            required= {true}
            errors={formErrors?.number}
            type='text'
          />
        </div>

        <div className="">
          <HijriDateInput
            labelId={'date_ar'}
            onChange={changeDate}
            value={judgement?.date_ar}
            label={'تاريخ الحكم'}
            required= {true}
            errors={formErrors?.date_ar}
          />
        </div>
        <div className="mb-3">
          <SelectInput
            label='المحكمة'
            labelId='court'
            value={judgement?.court}
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
          <Input
            labelId={'amount'}
            onChange={e=>onChange(e, {regex:amountRegex})}
            value={judgement?.amount}
            label={'الملبغ'}
            required= {true}
            errors={formErrors?.amount}
            type='text'
          />
        </div>
        <div className="my-5 col-span-2">
            <CheckBox 
                changeCheckBox={changeCheckBox}
                checked={judgement?.is_aganist_company}
                label='هل الحكم ضد الشركة ؟ '
                labelId='is_aganist_company'
                name='is_aganist_company'
            />
        </div>
        <div className="">
          <TextArea 
            labelId='result'
            label='نص الحكم'
            onChange={onChange}
            value={judgement?.result}
            required={false}
            errors={formErrors?.result}
          />
        </div>
        <div className="">
          <TextArea 
            labelId='notes'
            label='الملاحظات'
            onChange={onChange}
            value={judgement?.notes}
            required={false}
            errors={formErrors?.notes}
          />
        </div>
      

      </div>

    </form>
  )
}

export default JudgementForm
