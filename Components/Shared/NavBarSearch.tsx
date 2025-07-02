'use client'
import CaseDetailsOverLay from '@/app/cases/_Components/CaseDetailsOverLay'
import React, { ChangeEvent, useState } from 'react'
import { ImageSkeleton } from '../Common'
import { useGetNavBarSearchQuery } from '@/redux/api/casesApi'
import { IoCloseSharp } from 'react-icons/io5'
import { IoMdCloseCircle } from 'react-icons/io'

const NavBarSearch = () => {
    const [searchValue, setSearchValue] = useState('')
    const [modalCaseNumber, setModalCaseNumber] = useState('')
    const [modal, setModal] = useState(false)
    const {data, isLoading} = useGetNavBarSearchQuery({query:searchValue.trim()}, {skip:searchValue === ''})
    const handleSearchValue = (e:ChangeEvent<HTMLInputElement>) =>{
        setSearchValue(e.target.value)
    }
    const handleDetailsModal = () =>{
        setModal(!modal)
    }
    const handleCaseNumber = (case_number:string|null) =>{
        if(case_number){
            setModalCaseNumber(case_number)
            setModal(true)
        }else{
            setModalCaseNumber('')
            setModal(false)
        }
    }

    
  return (
    <>
        <CaseDetailsOverLay 
            case_number={modalCaseNumber}
            handleToggler={handleDetailsModal}
            open={modal}
        />
        <div className="w-[50%] relative">
            <div className="flex bg-card rounded-4xl p-0.5">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="44" height="44" rx="22" fill="#FBB827"/>
                    <path d="M21 30C25.9706 30 30 25.9706 30 21C30 16.0294 25.9706 12 21 12C16.0294 12 12 16.0294 12 21C12 25.9706 16.0294 30 21 30Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28.9299 30.6898C29.4599 32.2898 30.6699 32.4498 31.5999 31.0498C32.4499 29.7698 31.8899 28.7198 30.3499 28.7198C29.2099 28.7098 28.5699 29.5998 28.9299 30.6898Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <input
                    className='w-full p-2 outline-hidden border-none'
                    placeholder='ابحث برقم العميل أو القضية أو رقم الهوية أو رقم الجوال'
                    value={searchValue}
                    onChange={handleSearchValue}
                />
                {
                    searchValue?
                        <button onClick={()=>setSearchValue('')} className="p-1.5 hover:bg-secondary/20 top-1.5 rounded-full end-2 absolute">
                            <IoMdCloseCircle />
                        </button>
                    :null
                }
            </div>
            <div className={"absolute drop-shadow-lg z-3 w-full mt-2 transition-all ease-in duration-300 rounded-md bg-card overflow-y-auto "+(searchValue?'max-h-80':'max-h-0')}>
                <div className='p-5'>
                    {/* <p className="text-xs">القضايا</p> */}
                    <div className="grid">
                    {
                        isLoading?
                            <ImageSkeleton 
                                width='100%'
                                height='64px'
                                rounded='10px'
                                shadow
                            />
                        :
                            data?.cases?.length?
                                data?.cases.map((Case:{case_number:string, id: string})=>(
                                    <div key={Case?.id} onClick={()=>handleCaseNumber(Case?.case_number)}  className='mb-4 cursor-pointer bg-container py-2 rounded-md text-center'>
                                        <dl>رقم القضية</dl>
                                        <dd className='font-semibold'>{Case?.case_number}</dd>
                                    </div>
                                ))
                            :   
                                <div className='text-center'>لا توجد نتائج  بحث</div>
                    }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default NavBarSearch
