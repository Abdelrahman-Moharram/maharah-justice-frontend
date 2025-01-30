import React from 'react'
import DataSection from '../_Components/DataSection'

const page = () => {
    
    
    
  return (
    <DataSection
      exportFileName='جميع القضايا'
      filter=''
      fnKeys={['id']}
      base_url='cases/' 
    />
  )
}

export default page
