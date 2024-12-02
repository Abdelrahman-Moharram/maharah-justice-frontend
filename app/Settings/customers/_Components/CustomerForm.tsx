import Button from '@/Components/Common/Button'
import { CheckBox, Input, SelectInput } from '@/Components/Forms'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import { customerRegex, fullNameRegex, identityNumberRegex } from '@/Components/Hooks/Common/validationsRegexRepo'
import { useCustomers } from '@/Components/Hooks/Utils/useCustomers'
import OverLayFuncArea from '@/Components/Modals/OverLayFuncArea'
import { useAddCustomerMutation } from '@/redux/api/utilsApi'
import React, { FormEvent, useEffect } from 'react'
import { toast } from 'react-toastify'

interface baseType{
    id:string,
    name:string,
    
    
}
const CustomerForm = ({action, open, customerId}:{action:()=>void, open:boolean, customerId?:string}) => {
    const [addCustomer] = useAddCustomerMutation()
    const {
        customer,
        errors,
        dropdowns,
        onChange,
        setErrors,
        setCustomer,
        selectChange,
        changeCheckBox,
        getCustomerAsFormData
    } = useCustomers({customerId})
    
    const handleCustomerForm = (e:FormEvent) =>{
        e.preventDefault()

        if (customerId){

        }else{
            addCustomer({form:getCustomerAsFormData()})
            .unwrap()
            .then(res=>{
                console.log(res);
                
                toast.success(res?.message || 'تم إضافة المستخدم بنجاح')
                action()
            })
            .catch(err=>{
                setErrors(err?.data?.errors)
                if(err?.status !== 403)
                    toast.error(err?.data?.message || 'حدث خطأ ما أثناء إضافة المستخدم')
            })
        }
    }
  return (
    <form onSubmit={handleCustomerForm} className='relative min-h-[80%] px-12 mt-12'>
        <div className="grid grid-cols-2 gap-3 p-2 overflow-y-auto">
            <Input
                label='رقم العميل'
                labelId='number'
                onChange={e=>onChange(e, {regex:customerRegex})}
                type='text'
                value={customer.number}
                errors={errors?.number}
                required
            />
            <Input
                label='اسم العميل'
                labelId='name'
                onChange={e=>onChange(e, {regex:fullNameRegex})}
                type='text'
                value={customer.name}
                errors={errors?.name}
                required
            />
            <Input
                label='رقم هوية العميل'
                labelId='identity_number'
                onChange={e=>onChange(e, {regex:identityNumberRegex})}
                type='text'
                value={customer.identity_number}
                errors={errors?.identity_number}
                required
            />
            <div className="mt-8">
                <CheckBox 
                    changeCheckBox={changeCheckBox}
                    checked={customer?.is_company}
                    label='هل العميل شركة ؟'
                    labelId='is_company'
                    name='is_company'
                />
            </div>


            <SelectInput
                label='نوع العميل'
                labelId='customer_type'
                onChange={e=>selectChange(e)}
                value={customer.customer_type}
                errors={errors?.customer_type}
                required
            >
                {
                    dropdowns?.customer_types?.length?
                        dropdowns?.customer_types.map((ct:baseType)=>(
                            <option key={ct?.id} value={ct?.id}>{ct?.name}</option>   
                        ))
                    :
                    null
                }  
            </SelectInput>

            
            <SelectInput
                label='جنس العميل'
                labelId='gender'
                onChange={e=>selectChange(e)}
                value={customer.gender}
                errors={errors?.gender}
                required
            >
                {
                    dropdowns?.genders?.length?
                        dropdowns?.genders.map((ct:baseType)=>(
                            <option key={ct?.id} value={ct?.id}>{ct?.name}</option>   
                        ))
                    :
                    null
                }  
            </SelectInput>
        </div>
        <OverLayFuncArea
            open={open}
        >
            <Button submit className='bg-primary hover:bg-transparent border-primary' title={'حفظ'} isLoading={false} />
            <Button 
                onClick={action}
                className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
                title={'إلغاء'} 
                isLoading={false}
            />
        </OverLayFuncArea>
    </form>
  )
}

export default CustomerForm
