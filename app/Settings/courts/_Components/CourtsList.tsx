import React, { useState } from 'react'
import { useGetCourtsListQuery } from '@/redux/api/utilsApi'
import DeleteCourtModal from './DeleteCourtModal'
import CourtFormModal from './CourtFormModal'
import { CardsListWithPagination } from '../../_Components'

interface Props{
    page: number,
    size: number
}
interface courtType{
    id:string, 
    name:string
}
const CourtsList = ({page, size}:Props) => {
    const [currCourt, setCurrCourt] = useState<courtType|null>(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const {data, isLoading} = useGetCourtsListQuery({page:page-1, size})

    const handleDeleteModal = () =>{
        setDeleteModal(!deleteModal)
        if(currCourt){
            setCurrCourt(null)
        }
    }
    const handleEditModal = () =>{
        setEditModal(!editModal)
        if(currCourt){
            setCurrCourt(null)
        }
    }
    

    const editAction = (court:courtType) =>{     
        setEditModal(true)
        setCurrCourt(court)
    }
    const deleteAction = (court:courtType) =>{
        setDeleteModal(true)
        setCurrCourt(court)
    }
    
    return (
        <>
            <DeleteCourtModal
                handleToggler={handleDeleteModal}
                open={deleteModal}
                court={currCourt}
            />
            <CourtFormModal
                handleToggler={handleEditModal}
                open={editModal}
                oldCourt={currCourt}
            />
            <CardsListWithPagination
                data={data?.courts}
                deleteAction={deleteAction}
                editAction={editAction}
                isLoading={isLoading}
                page={page}
                total_pages={data?.total_pages}
                emptyMessage='لا توجد محاكم'
            />
        </>
    )
}

export default CourtsList
