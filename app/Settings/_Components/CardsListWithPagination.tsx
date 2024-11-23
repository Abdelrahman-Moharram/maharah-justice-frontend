import FnBasicCard from '@/Components/Cards/FnBasicCard'
import React from 'react'
import { EditDeleteButtons } from './ButtonsGroups'
import EmptyData from '@/Components/Common/EmptyData'
import { ImageSkeleton } from '@/Components/Common'
import Paginition from '@/Components/Lists/Paginition'
import DataTable from '@/Components/Tables/DataTable'

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
interface baseObjType{
    id: string,
    name?: string,
}
interface Props{
    isLoading: boolean,
    data: any[],
    editAction:(row:any)=>void,
    deleteAction:(row:any)=>void,
    total_pages:number,
    page:number,
    emptyMessage?:string
}
const CardsListWithPagination = ({data, deleteAction, editAction, isLoading, page, total_pages, emptyMessage}:Props) => {
    const options = (item:baseObjType) =>{
        return (
            <EditDeleteButtons
                editAction={editAction}
                deleteAction={deleteAction}
                item={item}
            />
        )
    }
  return (
    <div>
      {
            !isLoading?
                data?.length?
                    // Cards

                    <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1 gap-3">
                        {
                            data.map((item:{id:string, name:string})=>(
                                <FnBasicCard
                                    key={item?.id}
                                    keyName={item?.name}
                                >
                                    <EditDeleteButtons
                                        editAction={editAction}
                                        deleteAction={deleteAction}
                                        item={item}
                                    />
                                </FnBasicCard>
                            ))
                        }
                        
                    </div>

                    // Table

                    // <div className="w-[100%] mx-auto">
                    //     <DataTable
                    //         data={data}
                    //         emptyLinkHref=''
                    //         emptyText=''
                    //         fnKeys={['id']}
                    //         isLoading={isLoading}
                    //         isOptions
                    //         options={options}
                    //         optionsHeader='الإجراءات'
                    //     />
                    // </div>

                :
                    <EmptyData
                        height='100px'
                        message={emptyMessage || 'لا توجد بيانات'}
                    />
            :
                <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1 gap-3">
                    {handleImageSkeleton()}
                </div>
        }
    
        <div className='flex justify-center my-10 font-extrabold'>
            {
            total_pages && data?.length?
                <Paginition
                    page={page}
                    totalPages={total_pages}
                />                
            :null
            }
        </div>
    </div>
  )
}

export default CardsListWithPagination
