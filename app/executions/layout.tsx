import React from 'react'
import ExecutionsTabs from './_Components/Tabs'

const layout = ({children}:{children:React.ReactNode}) => {
    
  return (
    <div className="p-5 ">
        
      <h1 className='font-bold text-2xl mb-8'>طلبات التنفيذ</h1>
      <ExecutionsTabs />
      {children}
    </div>
  )
}

export default layout
