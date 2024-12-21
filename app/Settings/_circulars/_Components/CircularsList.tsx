import React, { useState } from 'react'
import { useGetCircularsListQuery } from '@/redux/api/utilsApi'
import DeleteCircularModal from './DeleteCircularModal'
import CircularFormModal from './CircularFormModal'
import { CardsListWithPagination } from '../../_Components'

interface Props{
    page: number,
    size: number
}
interface circularType{
    id:string, 
    name:string
}
const CircularsList = ({page, size}:Props) => {
    const [currCircular, setCurrCircular] = useState<circularType|null>(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const {data, isLoading} = useGetCircularsListQuery({page, size})

    const handleDeleteModal = () =>{
        setDeleteModal(!deleteModal)
        if(currCircular){
            setCurrCircular(null)
        }
    }
    const handleEditModal = () =>{
        setEditModal(!editModal)
        if(currCircular){
            setCurrCircular(null)
        }
    }
    

    const editAction = (circular:circularType) =>{     
        setEditModal(true)
        setCurrCircular(circular)
    }
    const deleteAction = (circular:circularType) =>{
        setDeleteModal(true)
        setCurrCircular(circular)
    }
    
    return (
        <>
            <DeleteCircularModal
                handleToggler={handleDeleteModal}
                open={deleteModal}
                circular={currCircular}
            />
            <CircularFormModal
                handleToggler={handleEditModal}
                open={editModal}
                oldCircular={currCircular}
            />
            <CardsListWithPagination
                data={data?.circulars}
                deleteAction={deleteAction}
                editAction={editAction}
                isLoading={isLoading}
                page={page}
                total_pages={data?.total_pages}
                emptyMessage='لا توجد دوائر'
            />
        </>
    )
}

export default CircularsList
