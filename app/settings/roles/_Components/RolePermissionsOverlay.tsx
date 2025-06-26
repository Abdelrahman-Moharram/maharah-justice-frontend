import OverLay from '@/Components/Modals/OverLay'
import React from 'react'
import RolePermissions from './Permissions/RolePermissions'

interface Props{
    open: boolean,
    handleOpen: ()=>void
    roleId: string
}
const RolePermissionsOverlay = ({open, handleOpen, roleId}:Props) => {

  return (
    <OverLay
        open={open}
        handleOpen={handleOpen}
        title='تعديل الصلاحيات'
    >
        <RolePermissions 
            roleId={roleId} 
        />
    </OverLay>
  )
}

export default RolePermissionsOverlay
