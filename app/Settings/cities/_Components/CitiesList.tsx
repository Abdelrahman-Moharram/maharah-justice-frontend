import React, { useCallback } from 'react'
import FnBasicCard from '@/Components/Cards/FnBasicCard'
import { EditDeleteButtons } from '../../_Components/ButtonsGroups'
import { useGetCitiesListQuery } from '@/redux/api/utilsApi'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { to_int_or_default } from '@/Components/utils/helper'
import EmptyData from '@/Components/Common/EmptyData'
import { ImageSkeleton } from '@/Components/Common'

const CitiesList = () => {
    const searchParams = useSearchParams()
    let size = to_int_or_default(searchParams.get("size")) 
    let page = to_int_or_default(searchParams.get("page")) 
    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
          return params.toString()
        },
        [searchParams]
    )
    const router = useRouter()
    const pathname = usePathname()
    if(!size){
      size = 20
      router.push(pathname + '?' + createQueryString('size', '20'))
    }
    if(!page){
      page = 1
      router.push(pathname + '?' + createQueryString('page', "1"))
    }
    const {data, isLoading} = useGetCitiesListQuery({page:page-1, size})

    const editAction = (id:string) =>{        
    }
    const deleteAction = () =>{
        
    }
    return (
        <>
            <div className="grid lg:grid-cols-4 md:lg:grid-cols-3 sm:lg:grid-cols-2 xs:lg:grid-cols-1">
                {
                    !isLoading?
                        data?.cities?.length?
                            data?.cities.map((city:{id:string, name:string})=>(
                                <FnBasicCard
                                    key={city?.id}
                                    keyName={city?.name}
                                >
                                    <EditDeleteButtons 
                                        editAction={editAction}
                                        deleteAction={deleteAction}
                                        id={city?.id}
                                    />
                                </FnBasicCard>
                            ))
                        :
                            <EmptyData
                                height='100px'
                                message='لا توجد مدن'
                            />
                    :
                        <ImageSkeleton
                            height='300px'
                            width='100%'
                            rounded='10px'
                            
                        />

                }
            </div>
        </>
    )
}

export default CitiesList
