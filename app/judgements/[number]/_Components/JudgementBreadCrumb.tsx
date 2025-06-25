'use client'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import { useParams } from 'next/navigation'
import React from 'react'

const JudgementBreadCrumb = ({title, href}:{title:string, href:string}) => {
const {number}:{number:string} = useParams()  
const BreadcrumbData = [
    {
      href: '/',
      title: 'الصفحة الرئيسية',
    },
    {
      href: '/judgements',
      title: 'الأحكام',
    },
    {
      href: href.replace('number', number),
      title: title,
      current:true
    }
  ]
return (
    <Breadcrumb 
        items={BreadcrumbData}
    />
  )
}

export default JudgementBreadCrumb
