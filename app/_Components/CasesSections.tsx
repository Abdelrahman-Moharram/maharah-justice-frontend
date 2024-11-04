'use client'
import CardsSwiperWithTitle from '@/Components/Swipper/CardsSwiperWithTitle'
import { useGetIndexPageQuery } from '@/redux/api/casesApi'
import React, { useState } from 'react'
import CaseDetailsOverLay from '../cases/_Components/CaseDetailsOverLay'

const CasesSections = () => {
  const {data, isLoading} = useGetIndexPageQuery(undefined)
  const [modalCaseNumber, setModalCaseNumber] = useState('')
  const [modal, setModal] = useState(false)
  const handleDetailsModal = () =>{
    setModal(!modal)
  }
  const handleCaseNumber = (case_number:string) =>{
    setModalCaseNumber(case_number)
  }
  return (
    <>
      <CaseDetailsOverLay 
        case_number={modalCaseNumber}
        handleToggler={handleDetailsModal}
        open={modal}
      />
      <div className="space-y-10">
        <CardsSwiperWithTitle 
          cases={data?.daily?.cases}
          count={data?.daily?.count}
          link={'/sessions?filter=daily'}
          title='جلسات اليوم'
          handleCaseNumber={handleCaseNumber}
          handleDetailsModal={handleDetailsModal}
        />
        <CardsSwiperWithTitle 
          cases={data?.finished?.cases}
          count={data?.finished?.count}
          link={'/sessions?filter=finished'}
          title='القضايا المنتهية'
          handleCaseNumber={handleCaseNumber}
          handleDetailsModal={handleDetailsModal}
        />
      </div>
    </>
  )
}

export default CasesSections
