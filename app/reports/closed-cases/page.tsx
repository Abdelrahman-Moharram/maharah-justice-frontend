import React from 'react'
import DataSection from '../_Components/DataSection'

const page = () => {
  return (
    <DataSection 
      exportFileName='القضايا المغلقة'
      filter='finished'
      fnKeys={['id']}
      base_url='cases/'
    />
  )
}

export default page
