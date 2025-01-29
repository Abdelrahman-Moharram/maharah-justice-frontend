import Link from 'next/link'
import React from 'react'

interface TabType{
    title:string,
    href:string,
    icon?:React.ReactNode,
    isCurrent?:boolean
}
interface Props{
    tabs: TabType[]
    page?: string 
}
const Tabs = ({tabs, page}:Props) => {
  return (
    <div>
        <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">Tab</label>

            <select id="Tab" className="w-full rounded-md border-gray-200">
                {
                    tabs?.map(tab=>(
                        <option value={tab.href} key={tab.href}>{tab.title}</option>
                    ))
                }
            </select>
        </div>

        <div className="hidden sm:block">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6" aria-label="Tabs">
                    {
                        tabs.map(tab=>(
                            <Link
                                href={tab?.href}
                                key={tab?.href}
                                className={tab?.isCurrent || page && tab.href == page?'shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600':"shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                            >
                                {tab?.icon} {tab?.title}
                            </Link>
                        ))
                    }
                </nav>
            </div>
        </div>
    </div>
  )
}

export default Tabs
