import Link from 'next/link'
import React from 'react'
import { MdManageAccounts } from 'react-icons/md'

interface innerLinkType{
    title:string,
    link:string,
    icon?:React.ReactNode
}
interface Props{
    toggle: boolean,
    title: string,
    icon:React.ReactNode,
    innerLinks: innerLinkType[]
}
const SideNavDropDownItem = ({toggle, title, icon, innerLinks}:Props) => {
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
        >
            <div className="flex items-center gap-2 text-sm font-medium"> {icon} <span className={`${toggle?'hidden':''}`}>{title}</span> </div>

            {
                toggle
                ?
                    null
                :
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
            }


        </summary>
        {
            toggle?
                    null
                :
                    <ul className="mt-2 space-y-1 px-4">
                        {
                            innerLinks.map((link, idx)=>(
                                <li key={idx}>
                                    <Link
                                        href={link.link}
                                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        {link?.icon}
                                        {link.title}
                                    </Link>
                                </li>      
                            ))
                        }                  
                    </ul>
        }
    </details>
  )
}

export default SideNavDropDownItem
