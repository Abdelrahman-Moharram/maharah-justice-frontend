'use client'
import { Button } from '@/Components/Common'
import { HijriDateInput, Input, SelectInput, TextArea } from '@/Components/Forms'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import { numberPattern } from '@/Components/Hooks/Common/validationsRegexRepo'
import useExecutionsForm from '@/Components/Hooks/Judgements/useExecutions'
import { baseType } from '@/Components/Types/Others'
import { useAddExecutionMutation } from '@/redux/api/JudgementsApi'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'
import { toast } from 'react-toastify'

const ExecutionForm = () => {
    const router = useRouter()
    const {number, exec_number}:{number:string, exec_number:string} = useParams()
    const [addExecution, {isLoading}] = useAddExecutionMutation()
    const {
        form,
        formErrors,
        dropDowns,
        onChange,
        changeDate,
        selectChange,
        setFormErrors,
        getExecutionAsFormData
    } = useExecutionsForm({judgement_number:number, exec_number})
    const formSubmit = (e:FormEvent) =>{
        e.preventDefault()
        if(isErrorsList(formErrors)){
            toast.error('برجاء التأكد من إدخال بيانات التنفيذ بشكل صحيح أولا')
            return
          }
          addExecution({form:getExecutionAsFormData(), judgement_number:number})
          .unwrap()
          .then(res=>{
              toast.success(res?.message || 'تم إضافة التنفيذ بنجاح')
              router.push("/cases")
            })
            .catch((err:any)=>{     
              console.log(err);
              if(err.data.errors)
                setFormErrors(err.data.errors)
              if(err.data.message)
                toast.error(err.data.message)
          })
    }
  return (
    <form 
        encType='multipart/form-data'
        onSubmit={formSubmit}
        method='post'
    >
        <div className='grid grid-cols-2 gap-4 '>
            <div className="mb-5">
                <Input 
                    type='text'
                    labelId='number'
                    label='الرقم التنفيذي'
                    onChange={e=>onChange(e, {regex:{value:numberPattern, message:'الرقم التنفيذي يجب ان يتكون من أرقام فقط وألا يقل عن رقمين'}})}
                    value={form?.number}
                    errors={formErrors?.number}
                    required
                />
            </div>
            <div className="mb-5">
                <HijriDateInput
                    labelId={'date_ar'}
                    onChange={changeDate}
                    value={form?.date_ar}
                    label={'تاريخ التنفيذ'}
                    required={true}
                    errors={formErrors?.date_ar}
                />
            </div>
            <div className="mb-5 col-span-2">
                <SelectInput 
                    labelId='execution_type'
                    label='نوع التنفيذ'
                    onChange={selectChange}
                    value={form?.execution_type}
                    required
                    errors={formErrors?.execution_type}
                    options={dropDowns?.execution_types.map((type:baseType)=>({label:type.name, value:type?.id}))}
                />
            </div>

            <div className="mb-5">
                <SelectInput 
                    labelId='state'
                    label='حالة الطلب التنفيذي'
                    onChange={selectChange}
                    value={form?.state}
                    required
                    errors={formErrors?.state}
                    options={dropDowns?.execution_states.map((type:baseType)=>({label:type.name, value:type?.id}))}
                />
            </div>
            <div className="mb-5">
                <SelectInput 
                    labelId='city'
                    label='المدينة'
                    onChange={selectChange}
                    value={form?.city}
                    required
                    errors={formErrors?.city}
                    options={dropDowns?.cities.map((type:baseType)=>({label:type.name, value:type?.id}))}
                />
            </div>

            <div className="mb-5">
                <TextArea 
                    labelId='action'
                    label='نص التنفيذ'
                    onChange={onChange}
                    value={form?.action}
                    required={false}
                    errors={formErrors?.action}
                />
            </div>
            <div className="mb-5">
                <TextArea 
                    labelId='notes'
                    label='الملاحظات'
                    onChange={onChange}
                    value={form?.notes}
                    required={false}
                    errors={formErrors?.notes}
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-24">
            <Button 
                submit 
                variant='primary'
                disabled={false}
                title={'حفظ'} 
                isLoading={isLoading} 
            />
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

export default ExecutionForm
