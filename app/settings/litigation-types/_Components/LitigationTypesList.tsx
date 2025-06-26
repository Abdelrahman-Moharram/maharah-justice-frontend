import React, { useState } from 'react'
import { useGetLitigationTypeListQuery } from '@/redux/api/utilsApi'
import DeleteLitigationTypeModal from './DeleteLitigationTypeModal'
import LitigationTypeFormModal from './LitigationTypeFormModal'
import { CardsListWithPagination } from '../../_Components'

interface Props{
    page: number,
    size: number
}
interface litigationTypeType{
    id:string, 
    name:string
}
const LitigationTypesList = ({page, size}:Props) => {
    const [currLitigationType, setCurrLitigationType] = useState<litigationTypeType|null>(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const {data, isLoading} = useGetLitigationTypeListQuery({page, size})
    
    const handleDeleteModal = () =>{
        setDeleteModal(!deleteModal)
        if(currLitigationType){
            setCurrLitigationType(null)
        }
    }
    const handleEditModal = () =>{
        setEditModal(!editModal)
        if(currLitigationType){
            setCurrLitigationType(null)
        }
    }
    

    const editAction = (litigationType:litigationTypeType) =>{     
        setEditModal(true)
        setCurrLitigationType(litigationType)
    }
    const deleteAction = (litigationType:litigationTypeType) =>{
        setDeleteModal(true)
        setCurrLitigationType(litigationType)
    }
    
    return (
        <>
            <DeleteLitigationTypeModal
                handleToggler={handleDeleteModal}
                open={deleteModal}
                litigationType={currLitigationType}
            />
            <LitigationTypeFormModal
                handleToggler={handleEditModal}
                open={editModal}
                oldLitigationType={currLitigationType}
            />
            <CardsListWithPagination
                data={data?.litigation_types}
                deleteAction={deleteAction}
                editAction={editAction}
                isLoading={isLoading}
                page={page}
                total_pages={data?.total_pages}
                emptyMessage='لا توجد أنواع قضايا'
            />
        </>
    )
}

export default LitigationTypesList
