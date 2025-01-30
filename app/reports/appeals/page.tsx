import React from 'react'
import DataSection from '../_Components/DataSection'

const page = () => {
    
    
    
  return (
    <DataSection
      exportFileName='الإعتراضات'
      filter=''
      fnKeys={[]}
      base_url='judgements/appeals/' 
      amountKeys={['مبلغ الحكم', 'مبلغ القضية']}
    />
  )
}

export default page
