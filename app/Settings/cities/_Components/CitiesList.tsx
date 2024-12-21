import React, { useState } from 'react'
import { useGetCitiesListQuery } from '@/redux/api/utilsApi'
import DeleteCityModal from './DeleteCityModal'
import CityFormModal from './CityFormModal'
import { CardsListWithPagination } from '../../_Components'

interface Props{
    page: number,
    size: number
}
interface cityType{
    id:string, 
    name:string
}
const CitiesList = ({page, size}:Props) => {
    const [currCity, setCurrCity] = useState<cityType|null>(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const {data, isLoading} = useGetCitiesListQuery({page, size})

    const handleDeleteModal = () =>{
        setDeleteModal(!deleteModal)
        if(currCity){
            setCurrCity(null)
        }
    }
    const handleEditModal = () =>{
        setEditModal(!editModal)
        if(currCity){
            setCurrCity(null)
        }
    }
    

    const editAction = (city:cityType) =>{     
        setEditModal(true)
        setCurrCity(city)
    }
    const deleteAction = (city:cityType) =>{
        setDeleteModal(true)
        setCurrCity(city)
    }
    
    return (
        <>
            <DeleteCityModal
                handleToggler={handleDeleteModal}
                open={deleteModal}
                city={currCity}
            />
            <CityFormModal
                handleToggler={handleEditModal}
                open={editModal}
                oldCity={currCity}
            />
            <CardsListWithPagination
                data={data?.cities}
                deleteAction={deleteAction}
                editAction={editAction}
                isLoading={isLoading}
                page={page}
                total_pages={data?.total_pages}
                emptyMessage='لا توجد مدن'
            />
        </>
    )
}

export default CitiesList
