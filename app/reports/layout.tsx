import React from 'react'
import ReportTabs from './_Components/Tabs'

const layout = ({children}:{children:React.ReactNode}) => {
    const tabs = [
        {title:'القضايا', href:'/reports/cases'},
        {title:'الجلسات', href:'/reports/sessions', },
        {title:'القضايا المغلقة', href:'/reports/closed-cases', },
        {title:'قضايا الأحكام', href:'/reports/judgement-cases', },
    ]
  return (
    <div className="p-5">
        <ReportTabs 
            tabs={tabs}
        />
        {children}
    </div>
  )
}

export default layout
