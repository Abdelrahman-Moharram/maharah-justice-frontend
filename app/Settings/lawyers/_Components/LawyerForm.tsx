import Button from '@/Components/Common/Button'
import { CheckBox, Input, SelectInput } from '@/Components/Forms'
import PhoneNumberInputField from '@/Components/Forms/PhoneNumberInputField'
import UserSearchInputField from '@/Components/Forms/UserSearchInputField'
import { useLawyersForm } from '@/Components/Hooks/Auth/useAccounts'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import { emailAddressRegex, phoneNumberRegex } from '@/Components/Hooks/Common/validationsRegexRepo'
import OverLayFuncArea from '@/Components/Modals/OverLayFuncArea'
import { useAddLawyerMutation, useEditLawyerMutation } from '@/redux/api/accountsApi'
import React from 'react'
import { toast } from 'react-toastify'


const LawyerForm = ({action, open, lawyerId}:{action:()=>void, open:boolean, lawyerId?:string}) => {
    
    const [addLawyer, {isLoading:addLoading}] = useAddLawyerMutation()
    const [editLawyer, {isLoading:editLoading}] = useEditLawyerMutation()
    const {
        lawyer,
        formErrors,
        onChange,
        changeUser,
        setFormErrors,
        changeCheckBox,
        getLawyerAsFormData,
    } = useLawyersForm({lawyerId, toggler:open})


    const handleLawyer = () =>{
        if(lawyerId){
            setFormErrors({...formErrors})
        }
        if(isErrorsList(formErrors, lawyerId?['password']:[])){
            toast.error('برجاء التأكد من إدخال بيانات المستخدم بشكل صحيح أولا')
            return
        }
        if(lawyerId)
        {
            editLawyer({id:lawyerId, form:getLawyerAsFormData()})
            .unwrap()
            .then(res=>{
                toast.success(res?.data?.message || 'تم تعديل المستخدم بنجاح')
                action()
            })
            .catch(err=>{
                setFormErrors(err?.data?.errors)
                if(err?.status !== 403)
                    toast.error(err?.data?.message || 'حدث خطأ ما أثناء إضافة المستخدم')
            })
        }else{
            addLawyer({form:getLawyerAsFormData()})
                .unwrap()
                .then(res=>{
                    toast.success(res?.data?.message || 'تم نعديل المستخدم بنجاح')
                    action()
                })
                .catch(err=>{
                    setFormErrors(err?.data?.errors)
                    if(err?.status !== 403)
                        toast.error(err?.data?.message || 'حدث خطأ ما أثناء إضافة المستخدم')
                })
        }
    }
  return (
    <>
        <div className="grid grid-cols-2 gap-3 px-12 mt-12">
            <Input
                onChange={e=>onChange(e, {regex:emailAddressRegex})}
                value={lawyer.email}
                label='البريد الإلكتروني'
                labelId='email'
                type='text'
                errors={formErrors?.email}
                required={true}
            />
            <PhoneNumberInputField
                onChange={e=>onChange(e, {regex:phoneNumberRegex})}
                value={lawyer.phone_number}
                label='رقم الجوال'
                labelId='phone_number'
                errors={formErrors?.phone_number}
                required={true}
            />

            <div className='mt-10'>
                <UserSearchInputField
                    label='الحساب'
                    labelId='user'
                    oldNameValue={lawyer.username}
                    onChange={changeUser}
                    errors={formErrors?.user}
                    required
                />
            </div>
            <div className='mt-10'>
                <div className="mt-8">
                    <CheckBox 
                        changeCheckBox={changeCheckBox}
                        checked={lawyer?.is_consultant}
                        label='مستشار'
                        labelId='is_consultant'
                        name='is_consultant'
                    />
                </div>
            </div>
        </div>

            

        <OverLayFuncArea
            open={open}
        >
            <Button onClick={handleLawyer} variant='primary' title={'حفظ'} isLoading={addLoading || editLoading} />
            <Button 
                onClick={action}
                className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
                title={'إلغاء'} 
                isLoading={false}
                variant='secondary'
            />
        </OverLayFuncArea>
    </>
  )
}

export default LawyerForm
