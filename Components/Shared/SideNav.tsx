'use client'
import Link from "next/link";
import Image from "next/image";
import { HiBuildingLibrary } from "react-icons/hi2";
import SideNavDropDownItem from "./SideNavDropDownItem";
import { useAppSelector } from "@/redux/hooks";


// const 

export default function SideNav() {
    
    const {role} = useAppSelector(state => state.auth.user)
    
    const casesInnerLinks = [
        {title:'إضافة قضية', link:'/cases/add'},
        {title:'جميع القضايا', link:'/cases'}, 
        {title:'القضايا المنتهية', link:'/sessions?filter=finished'},
        {title:'قضايا اللجنة التمويلية', link:'/cases?filter=financial'},
    ]
    
    const sessionsInnerLinks =()=>{
    
        const sessions = [
            {title:'جلسات اليوم', link:'/sessions?filter=daily'}, 
            {title:'الجلسات الأسبوعية', link:'/sessions?filter=weekly'},
            {title:'الجلسات القائمة', link:'/sessions?filter=active'},
            {title:'الجلسات المنتهية', link:'/sessions?filter=finished'},
            {title:'جميع الجلسات', link:'/sessions'}, 
        ]
        if(role && role.toLocaleLowerCase() === 'lawyer')
            sessions.unshift({title:'جلساتي', link:'/sessions?filter=mine'})
    
        return sessions
    }
    
    
    return (
        <div className={"w-[62px] hover:w-[250px] relative transition-all duration-300"}>
            <div className={' w-[62px] hover:w-[250px] h-full fixed transition-all delay-50 bg-side-nav drop-shadow-2xl text-white'}>
                <ul className="h-full overflow-y-auto overflow-x-hidden py-5 px-1 space-y-1">
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
                            title="الصفحة الرئيسية"
                            innerLinks={[]}
                            icon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 18V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            }
                            baseKey=''
                        />
                    </li>  
                    <li>
                        <SideNavDropDownItem 
                            title="القضايا"
                            innerLinks={casesInnerLinks}
                            icon={
                                <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.37 2.15009L21.37 5.75006C21.72 5.89006 22 6.31006 22 6.68006V10.0001C22 10.5501 21.55 11.0001 21 11.0001H3C2.45 11.0001 2 10.5501 2 10.0001V6.68006C2 6.31006 2.28 5.89006 2.63 5.75006L11.63 2.15009C11.83 2.07009 12.17 2.07009 12.37 2.15009Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 22H2V19C2 18.45 2.45 18 3 18H21C21.55 18 22 18.45 22 19V22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4 18V11" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 18V11" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 18V11" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 18V11" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20 18V11" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1 22H23" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                                             
                            }
                            baseKey='cases'
                        />
                    </li>  

                    <li>
                        <SideNavDropDownItem 
                            title="الجلسات"
                            innerLinks={sessionsInnerLinks()}
                            icon={
                                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.0101 18.5101L15.0601 13.5601" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.0602 13.56L11.5202 17.1C10.7402 17.88 9.47024 17.88 8.69024 17.1L4.45023 12.86C3.67023 12.08 3.67023 10.81 4.45023 10.03L11.5202 2.96C12.3002 2.18 13.5702 2.18 14.3502 2.96L18.5902 7.20002C19.3702 7.98002 19.3702 9.25001 18.5902 10.03L15.0602 13.56Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 21H8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.56006 7.91992L13.6301 14.9899" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                }
                            baseKey='sessions'
                        />
                    </li>                    

                    <li>
                        <SideNavDropDownItem 
                            title="القضايا"
                            innerLinks={casesInnerLinks}
                            icon={<HiBuildingLibrary />}
                            baseKey='cases'
                        />
                    </li>
                </ul>
                
            </div>
        </div>
    );
}