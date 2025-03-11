'use client'
import Link from 'next/link'
import React from 'react'
import ImageSkeleton from './ImageSkeleton';
import { IoMdArrowDropright } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import { capitalizeFirstLetter } from '../utils/helper';
import { ImHome3 } from 'react-icons/im';

interface item{
  href: string;
  title: string;
  icon?: React.ReactNode;
  current?: boolean
}
const Breadcrumb = ({items}:{items?:item[]|undefined}) => {
const pathnames = usePathname().split('/')
return (
    
<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-1 text-sm text-color">
    {
        items?.length?
            items.map((item, i)=>(
                <li className="flex items-center" key={i}>
                    {
                        i !== 0?
                          <div className="mx-3">
                            <IoMdArrowDropright />
                          </div>

                        :null
                    }
                    {
                      item?.current?
                        <p className="font-semibold text-color flex gap-2 items-center transition "> {item.icon}{item.title} </p>
                        :
                        <Link href={item.href} className="font-semibold text[20px] text-[#3091F2] hover:text-color flex gap-2 items-center transition ">{item.icon} {item.title} </Link>
                    }
                </li>
            ))
        :
        pathnames.length?
        pathnames.map((path, index)=>(
          <li className="flex items-center" key={index}>
              {
                  index == 0?
                    <Link href={'/'} className="font-semibold text[20px] text-[#3091F2] hover:text-color flex gap-2 items-center transition "><ImHome3 /> Home </Link>
                  :null
              }
              {
                  index !== 0?
                    <div className="mx-3">
                      <IoMdArrowDropright />
                    </div>

                  :null
              }
              {
                index == pathnames.length-1?
                  <p className="font-semibold text-color flex gap-2 items-center transition ">{capitalizeFirstLetter(path)} </p>
                  :
                  <Link href={pathnames.slice(0, index+1).join('/')} className="font-semibold text[20px] text-[#3091F2] hover:text-color flex gap-2 items-center transition ">{capitalizeFirstLetter(path)}</Link>
              }
          </li>
        ))
        :
        <ImageSkeleton width='100px' height='40px' />
    }
  </ol>
</nav>
  )
}

export default Breadcrumb