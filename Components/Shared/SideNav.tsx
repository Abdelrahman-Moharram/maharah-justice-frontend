'use client'
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RiMovieLine } from "react-icons/ri";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import Image from "next/image";

export default function SideNav({className}:{className?:string}) {

    const [toggle, setToggle] = useState(true)
    return (
        <div className={(toggle?'w-[50px]':'w-[200px]')+' h-[800px] drop-shadow-2xl transition-all duration-300 ease py-3 bg-container default-shadow rounded-md text-color'}>
            <ul className="h-[90%]">
                <li className='mb-5'>
                    <Link href={'/'}>
                        <Image 
                            className="mx-auto"
                            src={'/logo.png'}
                            width={25}
                            height={25}
                            alt="logo"
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        href={''}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                    >
                        <FaHome />
                        <span className={`${toggle?'hidden':''}`}>
                            القضايا
                        </span>
                    </Link>
                </li>  

                <li>
                    <Link
                        href={''}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                    >
                        <RiMovieLine className="text-sm" />
                        <span className={"lg:text-sm text-xs " + `${toggle?'hidden':''}`}>
                            Sections & Content
                        </span>
                    </Link>
                </li>                    

                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <div className="flex items-center gap-2 text-sm font-medium"> <MdManageAccounts /> <span className={`${toggle?'hidden':''}`}>Manage</span> </div>

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
                                        <li>
                                        <Link
                                            href={''}
                                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            <IoSettingsSharp />
                                            Settings
                                        </Link>
                                        </li>

                                        <li>
                                        <a
                                            href={''}
                                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
                                        >
                                            <FaTrash />
                                            Delete
                                        </a>
                                        </li>

                                        
                                    </ul>
                        }
                    </details>
                </li>
            </ul>
            <div >
                <button onClick={()=>setToggle(!toggle)} className="w-full hover:bg-secondary transition-all hover:text-negitaive-color py-2 rounded-md flex justify-center">
                    <FaBarsStaggered />
                </button>
            </div>
        </div>
    );
}