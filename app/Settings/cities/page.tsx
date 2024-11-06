'use client'

import Breadcrumb from '@/Components/Common/Breadcrumb'
import React from 'react'
import CitiesList from './_Components/CitiesList'
const BreadcrumbData = [
  {
    href: '/',
    title: 'الصفحة الرئيسية',
  },
  {
    href: '/settings/cities',
    title: 'إعدادات المدن',
    current:true
  }
]

const page = () => {
  
  
  return (
    <div className='px-4'>
      <div className="my-8">
        <Breadcrumb
          items={BreadcrumbData}
        />
      </div>
      
      <CitiesList
      />
    
    </div>
  )
}

export default page
