'use client'
import Link from "next/link";
import Image from "next/image";
import SideNavDropDownItem from "./SideNavDropDownItem";
import { useAppSelector } from "@/redux/hooks";


// const 

export default function SideNav() {
    
    const {role} = useAppSelector(state => state.auth.user)
    
    const casesInnerLinks = [
        {title:'إضافة قضية', link:'/cases/add'},
        {title:'جميع القضايا', link:'/cases'}, 
        {title:'القضايا المنتهية', link:'/cases?filter=finished'},
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
            {title:'أنواع القضايا', link:'/settings/litigation-types'},
            // {title:'الدوائر', link:'/settings/circulars'},
            {title:'المستخدمين', link:'/settings/users'},
            {title:'الأدوار', link:'/settings/roles'}, 
            {title:'العملاء', link:'/settings/customers'},
            {title:'المحامين', link:'/settings/lawyers'},
        ]
        
    
        return settings
    }
    
    
    return (
        <div className={"w-[62px] hover:w-[250px] relative transition-all duration-300"}>
            <div className={' w-[62px] hover:w-[250px] h-full fixed transition-all delay-50 bg-secondary drop-shadow-2xl text-white'}>
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
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>



                            }
                            baseKey='settings'
                        />
                    </li>
                    <li>
                        <SideNavDropDownItem 
                            title="الإستشارات القانونية"
                            innerLinks={[]}
                            icon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.00007 22H16.0001C20.0201 22 20.7401 20.39 20.9501 18.43L21.7001 10.43C21.9701 7.99 21.2701 6 17.0001 6H7.00007C2.73007 6 2.03007 7.99 2.30007 10.43L3.05007 18.43C3.26007 20.39 3.98007 22 8.00007 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 6V5.2C8 3.43 8 2 11.2 2H12.8C16 2 16 3.43 16 5.2V6" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 13V14C14 14.01 14 14.01 14 14.02C14 15.11 13.99 16 12 16C10.02 16 10 15.12 10 14.03V13C10 12 10 12 11 12H13C14 12 14 12 14 13Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.65 11C19.34 12.68 16.7 13.68 14 14.02" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2.62012 11.27C4.87012 12.81 7.41012 13.74 10.0001 14.03" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>


                            }
                            baseKey='consultations'
                        />
                    </li>
                    <li>
                        <SideNavDropDownItem 
                            title="المكتبة القانونية"
                            innerLinks={settingsInnerLinks()}
                            icon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 12C3 12 3 13.79 3 16V17C3 19.76 3 22 8 22H16C20 22 21 19.76 21 17V16C21 13.79 21 12 17 12C16 12 15.72 12.21 15.2 12.6L14.18 13.68C13 14.94 11 14.94 9.81 13.68L8.8 12.6C8.28 12.21 8 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19 12V6C19 3.79 19 2 15 2H9C5 2 5 3.79 5 6V12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.55 9.23001H13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9.71997 6.23001H14.72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>


                            }
                            baseKey='المكتبة'
                        />
                    </li>
                    <li>
                        <SideNavDropDownItem 
                            title="التقارير"
                            innerLinks={settingsInnerLinks()}
                            icon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 13.4V16.4C17 20.4 15.4 22 11.4 22H7.6C3.6 22 2 20.4 2 16.4V12.6C2 8.6 3.6 7 7.6 7H10.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.0001 13.4H13.8001C11.4001 13.4 10.6001 12.6 10.6001 10.2V7L17.0001 13.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.6001 2H15.6001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 5C7 3.34 8.34 2 10 2H12.62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.9999 8V14.19C21.9999 15.74 20.7399 17 19.1899 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 8H19C16.75 8 16 7.25 16 5V2L22 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>


                            }
                            baseKey='التقارير'
                        />
                    </li>
                    <li>
                        <SideNavDropDownItem 
                            title="تحقق من الرصيد"
                            innerLinks={[]}
                            icon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22H17C20 22 22 20 22 17V12C22 9.3 20.3 7.3 17.8 7C17.6 7 17.3 7 17 7H7C6.7 7 6.5 6.99998 6.2 7.09998C3.6 7.39998 2 9.3 2 12C2 12.3 2 12.7 2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.8 7.00001C17.6 7.00001 17.3 7.00001 17 7.00001H6.99995C6.69995 7.00001 6.49995 6.99999 6.19995 7.09999C6.29995 6.79999 6.49996 6.6 6.79996 6.3L9.99995 3.00001C11.4 1.60001 13.6 1.60001 15 3.00001L16.8 4.8C17.4 5.4 17.7 6.20001 17.8 7.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 12.5H19C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.80157 21.4C7.57157 21.4 9.00156 19.97 9.00156 18.2C9.00156 16.43 7.57157 15 5.80157 15C4.03157 15 2.60156 16.43 2.60156 18.2C2.60156 19.97 4.03157 21.4 5.80157 21.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 22L3 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>


                            }
                            baseKey='تحقق'
                        />
                    </li>
                </ul>
                
            </div>
        </div>
    );
}