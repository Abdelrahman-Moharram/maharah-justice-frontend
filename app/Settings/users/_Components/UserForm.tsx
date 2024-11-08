import Button from '@/Components/Common/Button'
import { Input, SelectInput } from '@/Components/Forms'
import { useUsersForm } from '@/Components/Hooks/Auth/useAccounts'
import { isErrorsList } from '@/Components/Hooks/Common/useValidations'
import { fullNameRegex, usernameRegex } from '@/Components/Hooks/Common/validationsRegexRepo'
import { useAddUserMutation, useEditUserMutation } from '@/redux/api/accountsApi'
import React from 'react'
import { toast } from 'react-toastify'
interface UserType{
    id?: string,
    full_name: string,
    username: string,
    role: string,
    user_type: string,
}
interface baseType{
    id:string,
    name:string,
    
    
}
const UserForm = ({action, open, userId}:{action:()=>void, open:boolean, userId?:string}) => {
    const [addUser, {isLoading:addLoading}] = useAddUserMutation()
    const [editUser, {isLoading:editLoading}] = useEditUserMutation()
    const {
        user,
        formErrors,
        dropDowns,
        onChange,
        selectChange,
        setFormErrors,
        getUserAsFormData,
    } = useUsersForm({userId})
    const handleUser = () =>{
        if(userId){
            setFormErrors({...formErrors, password:null})
            console.log(userId, formErrors);
        }
        
        if(isErrorsList(formErrors, userId?['password']:[])){
            toast.error('برجاء التأكد من إدخال بيانات المستخدم بشكل صحيح أولا')
            return
        }
        if(userId)
        {
            editUser({id:userId, form:getUserAsFormData()})
            .unwrap()
            .then(res=>{
                toast.success(res?.data?.message || 'تم تعديل المستخدم بنجاح')
                action()
            })
            .catch(err=>{
                setFormErrors(err?.data?.errors)
                toast.error('حدث خطأ ما أثناء إضافة المستخدم')
            })
        }else{
            addUser({form:getUserAsFormData()})
                .unwrap()
                .then(res=>{
                    toast.success(res?.data?.message || 'تم إضافة المستخدم بنجاح')
                    action()
                })
                .catch(err=>{
                    setFormErrors(err?.data?.errors)
                    toast.error('حدث خطأ ما أثناء إضافة المستخدم')
                })
        }
    }
  return (
    <div className='relative min-h-[80%] px-12 mt-12'>
      <div className="grid grid-cols-2 gap-3 h-[80%] overflow-y-auto">
        <div className="mb-2">
            <Input
                onChange={e=>onChange(e, {regex:usernameRegex})}
                value={user.username}
                label='اسم المستخدم'
                labelId='username'
                type='text'
                errors={formErrors?.username}
                required={true}
            />
        </div>
        <div className="mb-2">
            <Input
                onChange={e=>onChange(e, {regex:fullNameRegex})}
                value={user.full_name}
                label='الاسم المستخدم باللغة العربية'
                labelId='full_name'
                type='text'
                errors={formErrors?.full_name}
                required={true}
            />
        </div>
        
        <div className="mb-2">
            <SelectInput
                labelId='role'
                label='الدور'
                onChange={selectChange}
                value={user?.role}
                required={true}
                errors={formErrors?.role}
            >
                {
                    dropDowns?.roles?.length?
                        dropDowns?.roles.map((role:baseType)=>(
                            <option key={role?.id} value={role?.id}>{role?.name}</option>   
                        ))
                    :
                    null
                }  
            </SelectInput>
        </div>
        <div className="mb-2">
            <SelectInput
                labelId='user_type'
                label='نوع المستخدم'
                onChange={selectChange}
                value={user?.user_type}
                required={true}
                errors={formErrors?.user_type}
            >
                {
                    dropDowns?.user_types?.length?
                        dropDowns?.user_types.map((user_type:baseType)=>(
                            <option key={user_type?.id} value={user_type?.id}>{user_type?.name}</option>   
                        ))
                    :
                    null
                }  
            </SelectInput>
        </div>
        {
            userId
            ?
                null
            :
            <div className="col-span-2 mb-2">
                <Input
                    onChange={e=>onChange(e, {minLength:{value:8, message:'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل'}})}
                    value={user.password}
                    label='كلمة المرور'
                    labelId='password'
                    type='password'
                    errors={formErrors?.password}
                    required={true}
                />
            </div>
        }
      </div>
        <div className={`grid grid-cols-2 gap-2 absolute bottom-10 left-10 right-10  bg-container transition-all delay-200`}>
                <Button onClick={handleUser} className='bg-primary hover:bg-transparent border-primary' title={'حفظ'} isLoading={addLoading||editLoading} />
                <Button 
                    onClick={action}
                    className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
                    title={'إلغاء'} 
                    isLoading={false}
                />
        </div>
    </div>
  )
}

export default UserForm
