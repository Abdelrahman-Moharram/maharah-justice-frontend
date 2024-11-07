import React, { useState } from 'react'
import FnBasicCard from '@/Components/Cards/FnBasicCard'
import { EditDeleteButtons } from '../../_Components/ButtonsGroups'
import { useGetStateListQuery } from '@/redux/api/utilsApi'
import EmptyData from '@/Components/Common/EmptyData'
import { ImageSkeleton } from '@/Components/Common'
import DeleteStateModal from './DeleteStateModal'
import Paginition from '@/Components/Lists/Paginition'
import StateFormModal from './StateFormModal'

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
    const handleImageSkeleton = () =>{
        const l = []
        for(let i = 0; i < 24; i ++){
            l.push(<ImageSkeleton
                height='80px'
                width='100%'
                rounded='10px'
            />)
        }
        return l
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
            {
                !isLoading?
                    data?.states?.length?
                        <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1 gap-3">
                            {
                                data?.states.map((state:{id:string, name:string})=>(
                                    <FnBasicCard
                                        key={state?.id}
                                        keyName={state?.name}
                                    >
                                        <EditDeleteButtons 
                                            editAction={editAction}
                                            deleteAction={deleteAction}
                                            item={state}
                                        />
                                    </FnBasicCard>
                                ))
                            }
                        </div>

                    :
                        <EmptyData
                            height='100px'
                            message='لا توجد حالات قضايا'
                        />
                :
                    <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1 gap-3">
                        {handleImageSkeleton()}
                    </div>
            }
            
            <div className='flex justify-center my-10 font-extrabold'>
              {
                data?.total_pages?
                    <Paginition
                        page={page}
                        totalPages={data?.total_pages}
                    />                
                :null
              }
          </div>
        </>
    )
}

export default StatesList
