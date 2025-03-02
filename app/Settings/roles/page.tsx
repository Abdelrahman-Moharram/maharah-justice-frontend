"use client"
import Breadcrumb from '@/Components/Common/Breadcrumb'
import { to_int_or_default } from '@/Components/utils/helper'
import { useGetRolesListQuery } from '@/redux/api/rolesApi'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { CardsListWithPagination } from '../_Components'
import RoleFormModal from './_Components/RoleFormModal'
import { baseType } from '@/Components/Types/Others'
import { RoleFunctionButtonGroup } from './_Components/RoleFunctionButtonGroup'
import RolePermissionsOverlay from './_Components/RolePermissionsOverlay'
import DataTable from '@/Components/Tables/DataTable'

const BreadcrumbData = [
  {
    href: '/',
    title: 'الصفحة الرئيسية',
  },
  {
    href: '/settings/roles',
    title: 'إعدادات المستخدمين',
    current:true
  }
]
interface baseObjType{
  id: string,
  name?: string,
}

const page = () => {
  const [showOverLay, setShowOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [roleId, setRoleId] = useState('')
  const [currRole, setCurrRole] = useState<baseType | null>(null)
  const searchParams = useSearchParams()
  
  
  let size = to_int_or_default(searchParams.get("size")) 
  let page = to_int_or_default(searchParams.get("page")) 
  
  

  const handleEditModal = (role:baseType) =>{    
    if(role)
      setRoleId(role.id||'')
    setShowModal(!showModal)
  }
  const handlePermissionsOverLay = (role:baseType) =>{    
    if(role)
      setRoleId(role.id||'')
    setShowOverlay(!showOverLay)
  }
  const handleDeleteModal = (role:baseType) =>{
    if(role)
      setCurrRole(role)
    setShowModal(!showModal)
  }
  const handleModal = () =>{
    if(currRole)
      setCurrRole(null)
    setShowModal(!showModal)
  }
  const handleOverlay = () =>{
    if(currRole)
      setCurrRole(null)
    setShowOverlay(!showOverLay)
  }
  const {data, isLoading} = useGetRolesListQuery({page, size})
  
  const options = (item:baseObjType) =>{
    return (
      <div className="flex justify-start">
        <RoleFunctionButtonGroup
          editAction={handleEditModal}
          deleteAction={handleDeleteModal}
          permissionsAction={handlePermissionsOverLay}
          item={item}
        />
      </div>
    )
}
  
  return (
    <>
      {/* <DeleteCityModal
        handleToggler={handleDeleteModal}
        open={deleteModal}
        city={currCity}
      /> */}
      <RolePermissionsOverlay
        roleId={roleId}
        handleOpen={handleOverlay}
        open={showOverLay}
      />
      <RoleFormModal
        handleToggler={handleModal}
        open={showModal}
        roleId={roleId}
      />
      <div className="my-8 flex justify-between">
        <Breadcrumb
          items={BreadcrumbData}
        />
        <button 
          onClick={handleModal}
          className="px-8 bg-primary hover:bg-primary/90 transition-all h-fit p-2 rounded-md text-negitaive-color flex items-center gap-3"
        >
          <FaPlusCircle /> 
          إضافة دور 
        </button>
      </div>
      <DataTable
        data={data?.roles}
        isLoading={isLoading}
        emptyText='لا توجد أدوار'
        options={options}
        isOptions
        fnKeys={['id']}
      />
    </>
  )
}

export default page
