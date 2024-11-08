import React, { useState } from 'react'
import FnBasicCard from '@/Components/Cards/FnBasicCard'
import { EditDeleteButtons } from '../../_Components/ButtonsGroups'
import { useGetLitigationTypeListQuery } from '@/redux/api/utilsApi'
import EmptyData from '@/Components/Common/EmptyData'
import { ImageSkeleton } from '@/Components/Common'
import DeleteModal from '@/Components/Modals/DeleteModal'
import DeleteLitigationTypeModal from './DeleteLitigationTypeModal'
import Paginition from '@/Components/Lists/Paginition'
import LitigationTypeFormModal from './LitigationTypeFormModal'

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
    const {data, isLoading} = useGetLitigationTypeListQuery({page:page-1, size})
    console.log(data);
    
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
            {
                !isLoading?
                    data?.litigation_types?.length?
                        <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1 gap-3">
                            {
                                data?.litigation_types.map((litigationType:{id:string, name:string})=>(
                                    <FnBasicCard
                                        key={litigationType?.id}
                                        keyName={litigationType?.name}
                                    >
                                        <EditDeleteButtons 
                                            editAction={editAction}
                                            deleteAction={deleteAction}
                                            item={litigationType}
                                        />
                                    </FnBasicCard>
                                ))
                            }
                        </div>

                    :
                        <EmptyData
                            height='100px'
                            message='لا توجد أنواع قضايا'
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

export default LitigationTypesList
