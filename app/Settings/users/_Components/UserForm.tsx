import Button from '@/Components/Common/Button'
import { Input, SelectInput } from '@/Components/Forms'
import { useUsersForm } from '@/Components/Hooks/Auth/useAccounts'
import { fullNameRegex, usernameRegex } from '@/Components/Hooks/Common/validationsRegexRepo'
import { useAddUserMutation } from '@/redux/api/accountsApi'
import React from 'react'
import { toast } from 'react-toastify'

interface baseType{
    id:string,
    name:string
}
const UserForm = ({action, open}:{action:()=>void, open:boolean}) => {
    const [addUser, {isLoading}] = useAddUserMutation()
    const {
        user,
        formErrors,
        dropDowns,
        onChange,
        selectChange,
        setFormErrors,
        getUserAsFormData,
    } = useUsersForm()
    const handleUser = () =>{
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
  return (
    <div className='relative min-h-[80%]'>
      <div className="grid grid-cols-2 gap-3 h-[80%] overflow-y-auto">
        <Input
            onChange={e=>onChange(e, {regex:usernameRegex})}
            value={user.username}
            label='اسم المستخدم'
            labelId='username'
            type='text'
            errors={formErrors?.username}
            required
        />

        <Input
            onChange={e=>onChange(e, {regex:fullNameRegex})}
            value={user.full_name}
            label='الاسم المستخدم باللغة العربية'
            labelId='full_name'
            type='text'
            errors={formErrors?.full_name}
            required
        />

        <SelectInput
            labelId='role'
            label='الدور'
            onChange={selectChange}
            value={user?.role}
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

        <SelectInput
            labelId='user_type'
            label='الدور'
            onChange={selectChange}
            value={user?.user_type}
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

        <div className="col-span-2">
            <Input
                onChange={e=>onChange(e)}
                value={user.password}
                label='كلمة المرور'
                labelId='password'
                type='password'
                errors={formErrors?.password}
                required
            />
        </div>
      </div>
        <div className={`grid grid-cols-2 gap-2 absolute left-10 right-10  bg-container transition-all delay-200 bottom-0 ${open?'mb-0':'-mb-10'}`}>
                <Button onClick={handleUser} className='bg-primary hover:bg-transparent border-primary' title={'حفظ'} isLoading={isLoading} />
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
