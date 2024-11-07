import React, { useState } from 'react'
import FnBasicCard from '@/Components/Cards/FnBasicCard'
import { EditDeleteButtons } from '../../_Components/ButtonsGroups'
import { useGetCourtsListQuery } from '@/redux/api/utilsApi'
import EmptyData from '@/Components/Common/EmptyData'
import { ImageSkeleton } from '@/Components/Common'
import DeleteModal from '@/Components/Modals/DeleteModal'
import DeleteCourtModal from './DeleteCourtModal'
import Paginition from '@/Components/Lists/Paginition'
import CourtFormModal from './CourtFormModal'

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
            {
                !isLoading?
                    data?.courts?.length?
                        <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1 gap-3">
                            {
                                data?.courts.map((court:{id:string, name:string})=>(
                                    <FnBasicCard
                                        key={court?.id}
                                        keyName={court?.name}
                                    >
                                        <EditDeleteButtons 
                                            editAction={editAction}
                                            deleteAction={deleteAction}
                                            item={court}
                                        />
                                    </FnBasicCard>
                                ))
                            }
                        </div>

                    :
                        <EmptyData
                            height='100px'
                            message='لا توجد محاكم'
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

export default CourtsList
