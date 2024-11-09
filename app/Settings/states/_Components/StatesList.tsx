import React, { useState } from 'react'
import { useGetStateListQuery } from '@/redux/api/utilsApi'
import { ImageSkeleton } from '@/Components/Common'
import DeleteStateModal from './DeleteStateModal'
import StateFormModal from './StateFormModal'
import { CardsListWithPagination } from '../../_Components'

interface Props{
    page: number,
    size: number
}
interface stateType{
    id:string, 
    name:string
}
const StatesList = ({page, size}:Props) => {
    const [currState, setCurrState] = useState<stateType|null>(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const {data, isLoading} = useGetStateListQuery({page:page-1, size})

    const handleDeleteModal = () =>{
        setDeleteModal(!deleteModal)
        if(currState){
            setCurrState(null)
        }
    }
    const handleEditModal = () =>{
        setEditModal(!editModal)
        if(currState){
            setCurrState(null)
        }
    }
    

    const editAction = (state:stateType) =>{     
        setEditModal(true)
        setCurrState(state)
    }
    const deleteAction = (state:stateType) =>{
        setDeleteModal(true)
        setCurrState(state)
    }
    
    return (
        <>
            <DeleteStateModal
                handleToggler={handleDeleteModal}
                open={deleteModal}
                state={currState}
            />
            <StateFormModal
                handleToggler={handleEditModal}
                open={editModal}
                oldState={currState}
            />
            <CardsListWithPagination
                data={data?.states}
                deleteAction={deleteAction}
                editAction={editAction}
                isLoading={isLoading}
                page={page}
                total_pages={data?.total_pages}
                emptyMessage='لا توجد حالات قضايا'
            />
        </>
    )
}

export default StatesList
