'use client'
import Link from "next/link";
import { RiMovieLine } from "react-icons/ri";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import Image from "next/image";
import { HiBuildingLibrary } from "react-icons/hi2";
import SideNavDropDownItem from "./SideNavDropDownItem";

export default function SideNav() {

    const [toggle, setToggle] = useState(true)

    const casesInnerLinks = [
        {title:'إضافة قضية', link:'/cases/add'},
        {title:'جميع القضايا', link:'/cases?filter=all'}, 
        {title:'القضايا المنتهية', link:'/cases?filter=finished'},
        {title:'قضايا اللجنة التمويلية', link:'/cases?filter=financial'},
    ]
    return (
        <div className={(toggle?'w-[50px]':'w-[200px]')+" mt-[20px] relative transition-all duration-300"}>
            <div className={' h-[calc(100vh-100px)] fixed py-3 bg-container drop-shadow-2xl rounded-md text-color'}>
                <ul className="h-[90%] overflow-y-auto overflow-x-hidden">
                    <li className='mb-5'>
                        <Link href={'/'}>
                            <Image 
                                className="mx-auto h-auto"
                                src={'/logo.png'}
                                width={25}
                                height={25}
                                alt="logo"
                            />
                        </Link>
                    </li>
                    <li>
                        <SideNavDropDownItem 
                            title="القضايا"
                            toggle={toggle}
                            innerLinks={casesInnerLinks}
                            icon={<HiBuildingLibrary />}
                        />
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
                        <SideNavDropDownItem 
                            title="القضايا"
                            toggle={toggle}
                            innerLinks={casesInnerLinks}
                            icon={<HiBuildingLibrary />}
                        />
                    </li>
                </ul>
                <div >
                    <button onClick={()=>setToggle(!toggle)} className="w-full hover:bg-secondary/10 transition-all hover:text-color py-2 rounded-md flex justify-center">
                        <FaBarsStaggered />
                    </button>
                </div>
            </div>
        </div>
    );
}