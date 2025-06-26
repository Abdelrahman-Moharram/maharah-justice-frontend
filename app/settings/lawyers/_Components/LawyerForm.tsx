import Button from '@/Components/Common/Button'
import { CheckBox, Input } from '@/Components/Forms'
import PhoneNumberInputField from '@/Components/Forms/PhoneNumberInputField'
import UserSearchInputField from '@/Components/Forms/UserSearchInputField'
import { useLawyersForm } from '@/Components/Hooks/Auth/useAccounts'
import { emailAddressRegex, phoneNumberRegex } from '@/Components/Hooks/Common/validationsRegexRepo'
import OverLayFuncArea from '@/Components/Modals/OverLayFuncArea'
import React from 'react'


const LawyerForm = ({action, open, lawyerId}:{action:()=>void, open:boolean, lawyerId?:string}) => {

    const {
        lawyer,
        formErrors,
        onChange,
        changeUser,
        isLoading,
        changeCheckBox,
        handleLawyer,
    } = useLawyersForm({lawyerId, toggler:open})


    
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
            <Button onClick={()=>handleLawyer(action)} variant='primary' title={'حفظ'} isLoading={isLoading} />
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
