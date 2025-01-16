import React from 'react'
import { permissionType } from './permissionsTypes'
import ToggledCard from '@/Components/Cards/ToggledCard'
import { CheckBox } from '@/Components/Forms'
import AddRolePermissionInput from './AddRolePermissionInput'



const Modules = ({name, permissions, roleId}:{name:string, permissions:permissionType[], roleId:string}) => {
    
  return (
    <ToggledCard 
        title={name}
        className='border'
    >
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 p-4">
            {
                permissions.map(permission=>(
                    <AddRolePermissionInput 
                        permission={permission}
                        roleId={roleId}
                        key={permission.key}
                    />
                ))
            }
        </div>
    </ToggledCard>
  )
}

export default Modules
