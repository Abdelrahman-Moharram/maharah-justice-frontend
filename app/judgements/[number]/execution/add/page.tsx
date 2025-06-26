import ExecutionForm from '@/app/executions/_Components/ExecutionForm'
import React from 'react'
import JudgementBreadCrumb from '../../_Components/JudgementBreadCrumb'


const page = () => {
    
  return (
    <div className='space-y-12 px-4 py-8'>
        <JudgementBreadCrumb 
            href='/judgements/number/execution/add'
            title='إضافة تنفيذ'
        />
      <ExecutionForm />
    </div>
  )
}

export default page
