'use client'
import Link from "next/link";
import Image from "next/image";
import SideNavDropDownItem from "./SideNavDropDownItem";
import { useAppSelector } from "@/redux/hooks";
import { useGetExecutionsTypesListQuery } from "@/redux/api/JudgementsApi";
import { IsAllowedPermissionOrNull } from "../Guards/IsAllowedPermission";
import { CaseIcon, FullLogo, HomeIcon, Logo } from "../utils/Icons";
import { useState } from "react";


// const 

export default function SideNav() {
    
    const {role} = useAppSelector(state => state.auth.user)
    const {data, isLoading} = useGetExecutionsTypesListQuery(undefined)
    
    const [isHovered, setIsHovered] = useState(false);

    
    
    const sessionsInnerLinks =()=>{
    
        const sessions = [
            {title:'جلسات اليوم', permission:'permissions.sessions.view.daily', link:'/sessions?filter=daily'}, 
            {title:'الجلسات الأسبوعية', permission:'permissions.sessions.view.weekly', link:'/sessions?filter=weekly'},
            {title:'الجلسات القائمة', permission:'permissions.sessions.view.active', link:'/sessions?filter=active'},
            {title:'الجلسات المنتهية', permission:'permissions.sessions.view.finished', link:'/sessions?filter=finished'},
            {title:'الجلسات الخاصة بي', permission:'permissions.sessions.view.mine', link:'/sessions?filter=mine'},
            {title:'جميع الجلسات', permission:'permissions.sessions.view.all', link:'/sessions'}, 
        ]
        if(role && role.toLocaleLowerCase() === 'lawyer')
            sessions.unshift({title:'جلساتي', permission:'', link:'/sessions?filter=mine'})
    
        return sessions
    }

    


    const sideNavLinks = [
        {
            title:"الصفحة الرئيسية",
            innerLinks:[],
            icon:<HomeIcon />,
            baseKey:'',
            permission:''
        },
        {
            icon:<CaseIcon />,
            title:"القضايا",
            baseKey:'cases',
            innerLinks:[
                    {title:'إضافة قضية', permission:'permissions.cases.add', link:'/cases/add'},
                    {title:'جميع القضايا', permission:'permissions.cases.view', link:'/cases'}, 
                    {title:'القضايا المنتهية', permission:'permissions.cases.view.finished', link:'/cases?filter=finished'},
                    {title:'قضايا اللجنة التمويلية', permission:'permissions.cases.view.financial', link:'/cases?filter=financial'},
                ],
            permission:''
        },
        
        {
            icon:<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.0101 18.5101L15.0601 13.5601" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.0602 13.56L11.5202 17.1C10.7402 17.88 9.47024 17.88 8.69024 17.1L4.45023 12.86C3.67023 12.08 3.67023 10.81 4.45023 10.03L11.5202 2.96C12.3002 2.18 13.5702 2.18 14.3502 2.96L18.5902 7.20002C19.3702 7.98002 19.3702 9.25001 18.5902 10.03L15.0602 13.56Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 21H8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.56006 7.91992L13.6301 14.9899" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
            title:"الجلسات",
            baseKey:'sessions',
            innerLinks:sessionsInnerLinks(),
            permission:''
        },
        {
            icon:<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6601 10.44L20.6801 14.62C19.8401 18.23 18.1801 19.69 15.0601 19.39C14.5601 19.35 14.0201 19.26 13.4401 19.12L11.7601 18.72C7.59006 17.73 6.30006 15.67 7.28006 11.49L8.26006 7.30001C8.46006 6.45001 8.70006 5.71001 9.00006 5.10001C10.1701 2.68001 12.1601 2.03001 15.5001 2.82001L17.1701 3.21001C21.3601 4.19001 22.6401 6.26001 21.6601 10.44Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.06 19.3901C14.44 19.8101 13.66 20.1601 12.71 20.4701L11.13 20.9901C7.15998 22.2701 5.06997 21.2001 3.77997 17.2301L2.49997 13.2801C1.21997 9.3101 2.27997 7.2101 6.24997 5.9301L7.82997 5.4101C8.23997 5.2801 8.62997 5.1701 8.99997 5.1001C8.69997 5.7101 8.45997 6.4501 8.25997 7.3001L7.27997 11.4901C6.29997 15.6701 7.58998 17.7301 11.76 18.7201L13.44 19.1201C14.02 19.2601 14.56 19.3501 15.06 19.3901Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.64 8.53003L17.49 9.76003" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.66 12.3999L14.56 13.1399" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> ,
            title:"التنفيذ",
            baseKey:'executions',
            innerLinks:data?.execution_types?.map((type:{id:string, name:string, key:string})=>({title:type.name, permission:'', link:`/executions?exec_type=${type?.key}`})),
            permission:'permissions.executions.view'
        },
        {
            icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> ,
            title:"الإعدادات",
            baseKey:'settings',
            innerLinks:[
                    {title:'المدن', permission:'permissions.cities.view', link:'/settings/cities'}, 
                    {title:'المحاكم', permission:'permissions.courts.view', link:'/settings/courts'},
                    {title:'حالات القضايا', permission:'permissions.states.view', link:'/settings/states'},
                    {title:'أنواع القضايا', permission:'permissions.litigation-types.view', link:'/settings/litigation-types'},
                    // {title:'الدوائر', permission:'permissions.circulars.view', link:'/settings/circulars'},
                    {title:'المستخدمين', permission:'permissions.users.view', link:'/settings/users'},
                    {title:'الأدوار', permission:'permissions.roles.view', link:'/settings/roles'}, 
                    {title:'المحامين', permission:'permissions.lawyers.view', link:'/settings/lawyers'},
                    {title:'العملاء', permission:'permissions.customers.view', link:'/settings/customers'},
                ],
            permission:''
        },
        {
            icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00007 22H16.0001C20.0201 22 20.7401 20.39 20.9501 18.43L21.7001 10.43C21.9701 7.99 21.2701 6 17.0001 6H7.00007C2.73007 6 2.03007 7.99 2.30007 10.43L3.05007 18.43C3.26007 20.39 3.98007 22 8.00007 22Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6V5.2C8 3.43 8 2 11.2 2H12.8C16 2 16 3.43 16 5.2V6" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 13V14C14 14.01 14 14.01 14 14.02C14 15.11 13.99 16 12 16C10.02 16 10 15.12 10 14.03V13C10 12 10 12 11 12H13C14 12 14 12 14 13Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21.65 11C19.34 12.68 16.7 13.68 14 14.02" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.62012 11.27C4.87012 12.81 7.41012 13.74 10.0001 14.03" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
            title:"الإستشارات القانونية",
            baseKey:'consultations',
            innerLinks:[],
            permission:'permissions.consultations.view'

        },
        {
            icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 13.4V16.4C17 20.4 15.4 22 11.4 22H7.6C3.6 22 2 20.4 2 16.4V12.6C2 8.6 3.6 7 7.6 7H10.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.0001 13.4H13.8001C11.4001 13.4 10.6001 12.6 10.6001 10.2V7L17.0001 13.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.6001 2H15.6001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 5C7 3.34 8.34 2 10 2H12.62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21.9999 8V14.19C21.9999 15.74 20.7399 17 19.1899 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 8H19C16.75 8 16 7.25 16 5V2L22 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
            title:"التقارير",
            baseKey:'reports/cases',
            innerLinks:[],
            permission:'permissions.cases.view'
        },
        
    ]
    
    
    return (
        <div 
            className={"w-[62px] hover:w-[280px] relative transition-all duration-300"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={' w-[62px] hover:w-[240px] h-full fixed transition-all delay-50 drop-shadow-2xl text-white'}>
                <ul className="h-full overflow-y-auto overflow-x-hidden py-5 px-1 space-y-1 ">
                    <li className='mb-12 px-2'>
                        <Link
                            className="" 
                            href={'/'}
                        >
                            {
                                isHovered?
                                    <FullLogo />
                                :
                                    <Logo />
                            }
                                
                        </Link>
                    </li>
                    {
                        sideNavLinks?.map(item=>(
                            <IsAllowedPermissionOrNull
                                permission={item?.permission}
                            >
                                <li id={item.title}>
                                    <SideNavDropDownItem 
                                        title={item?.title}
                                        innerLinks={item?.innerLinks}
                                        icon={item.icon}
                                        baseKey={item?.baseKey}
                                    />
                                </li>
                            </IsAllowedPermissionOrNull>
                        ))
                    }  
                    
                </ul>
                
            </div>
        </div>
    );
}