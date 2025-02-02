import React from 'react'
import DataSection from '../_Components/DataSection'

const page = () => {
    
    
    
  return (
    <DataSection
      exportFileName='نوع العميل'
      filter=''
      fnKeys={['id']}
      base_url='cases/' 
      amountKeys={['مبلغ القضية']}
    />
  )
}

export default page
