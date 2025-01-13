'use client'
import React from 'react'
import ConsultationDetails from '../_Components/ConsultationDetails'
import { useParams } from 'next/navigation'

const page = () => {
    const {consult_id}:{consult_id:string} = useParams()
  return (
    <div>
      <ConsultationDetails 
        consult_id={consult_id}
      />
    </div>
  )
}

export default page
