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

    const settingsInnerLinks =()=>{
    
        const settings = [
            {title:'المدن', link:'/settings/cities'}, 
            {title:'المحاكم', link:'/settings/courts'},
            {title:'حالات القضايا', link:'/settings/states'},
            {title:'المستخدمين', link:'/settings/users'},
            {title:'الأدوار', link:'/settings/roles'}, 
        ]
        
    
        return settings
    }
    
    
    return (
        <div className={"w-[62px] hover:w-[250px] relative transition-all duration-300"}>
            <div className={' w-[62px] hover:w-[250px] h-full fixed transition-all delay-50 bg-side-nav drop-shadow-2xl text-white'}>
                <ul className="h-full overflow-y-auto overflow-x-hidden py-5 px-1 space-y-1 side-nav-ul">
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
                                    <path d="M12 18V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                            title="الإعدادات"
                            innerLinks={settingsInnerLinks()}
                            icon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            }
                            baseKey='settings'
                        />
                    </li>
                </ul>
                
            </div>
        </div>
    );
}