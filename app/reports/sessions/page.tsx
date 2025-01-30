import React from 'react'
import DataSection from '../_Components/DataSection'

const page = () => {
    
  return (
    <DataSection
      exportFileName='قضايا الجلسات'
      filter=''
      fnKeys={['id', 'case_number']}
      base_url='sessions/'
    />
  )
}

export default page
