'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

interface innerLinkType{
    title:string,
    link:string,
    icon?:React.ReactNode
}
interface Props{
    title: string,
    icon:React.ReactNode,
    innerLinks?: innerLinkType[] ,
    baseKey:string
}
const SideNavDropDownItem = ({title, icon, innerLinks, baseKey}:Props) => {
    const path = usePathname()    
    return (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
                className={"flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:text-primary hover:bg-secondary transition-all "+(baseKey === path.split('/')[1]?'text-primary bg-secondary':'')}
            >
                {
                    innerLinks?.length?
                        <>
                            <div className="flex items-center gap-2 text-sm font-medium "> 
                                <div className="w-[24px] text-center hover:text-primary">
                                    {icon}
                                </div> 
                                <span className='mx-4'>{title}</span> 
                            </div>
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            </span>
                        </>
                    :
                        <Link href={"/"+baseKey} className="flex items-center gap-2 text-sm font-medium "> 
                            <div className="hover:text-primary">
                                {icon}
                            </div> 
                            <span className='mx-6'>{title}</span> 
                        </Link>
                
                }
                


            </summary>
            {
                innerLinks?.length?
                    <ul className="mt-2  space-y-1 px-5">
                        {
                            innerLinks.map((link, idx)=>(
                                <li key={idx}>
                                    <Link
                                        href={link.link}
                                        className="flex items-center gap-2 rounded-lg px-11 py-2 text-xs font-medium hover:text-primary hover:bg-secondary transition-all"
                                    >
                                        {link?.icon}
                                        {link.title}
                                    </Link>
                                </li>      
                            ))
                        }                  
                    </ul>
                :null
            }
        </details>
    )
}

export default SideNavDropDownItem
