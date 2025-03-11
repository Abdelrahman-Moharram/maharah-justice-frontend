import { Button } from '@/Components/Common'
import { SelectInput } from '@/Components/Forms'
import BaseModal from '@/Components/Modals/BaseModal'
import { baseType, ValidationsType } from '@/Components/Types/Others'
import { useDeleteRoleMutation, useGetRolesAsSelectListQuery, useRoleDetailsMutation } from '@/redux/api/rolesApi'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Props{
    handleToggler:()=>void,
    open:boolean,
    roleId:string
}
const DeleteRoleModal = ({open, handleToggler, roleId}:Props) => {
    const baseForm = {
      'alter_role':''
    }
    const [form, setForm] = useState(baseForm)
    const {data} = useGetRolesAsSelectListQuery({exclude:roleId})
    const [getRoleFormData, {data:role_data}] = useRoleDetailsMutation()
    const [deleteRole, {isLoading}] = useDeleteRoleMutation()

    const selectChange = (e: ChangeEvent<HTMLSelectElement>,  validationSchema?:ValidationsType)=>{
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    }
    useEffect(()=>{       
      if(roleId)
        getRoleFormData({id:roleId})  
      setForm(baseForm)      
  }, [roleId, open])

  const submitDeleteRole = () =>{
    
    if(roleId){
      deleteRole({roleId, alter_role: form.alter_role})
        .then(res=>{
          handleToggler()
          toast.success(res?.data?.message)
        })
        .catch(err=>{
          toast.error(err?.data?.message || 'حدث خطأ ما برجاء المحاولة لاحقا')
        })
    }
  }
  
  return (
    <BaseModal
      open={open}
      handleToggler={handleToggler}
    >
      <div className="space-y-5">
        <div className='text-red-500 text-lg font-semibold'>هل أنت متأكد من حذف الدور <span className='font-semibold'>"{role_data?.role?.name}"</span> ؟</div>
        <p className=''>يجب اختيار دور بديل لنقل جميع المستخدمين اليه بديلا عن هذا الدور</p>

        <div className="w-full">
          <SelectInput
            labelId='alter_role'
            label='الدور البديل'
            onChange={selectChange}
            value={form?.alter_role}
            emptyoption
            options={data?.roles?.map((i:baseType)=>({label:i.name, value:i.id}))}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
            <Button variant='red' title={'حذف'} onClick={submitDeleteRole} icon={<FaTrash />} isLoading={isLoading} />
            <Button 
              className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
              onClick={handleToggler}
              isLoading={false}
              title='إلغاء'
              variant='secondary'
            />
        </div>
      </div>
    </BaseModal>
  )
}

export default DeleteRoleModal
