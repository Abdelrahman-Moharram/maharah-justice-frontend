'use client'
import Tabs from '@/Components/Common/Tabs'
import { usePathname } from 'next/navigation'
import React from 'react'

interface TabType{
  title:string,
  href:string,
  icon?:React.ReactNode,
  isCurrent?:boolean
}
const ReportTabs = ({tabs}:{tabs:TabType[]}) => {
  const pathname        = usePathname()
    
  return (
    <div className=''>
      <Tabs 
        tabs={tabs}
        page={pathname}
      />
    </div>
  )
}

export default ReportTabs
