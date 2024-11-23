import Link from 'next/link'
import React from 'react'
import ImageSkeleton from './ImageSkeleton';

interface item{
  href: string;
  title: string;
  current?: boolean
}
const Breadcrumb = ({items}:{items:item[]|undefined}) => {
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
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.31494 1.05994L1.42494 5.94994C0.847442 6.52744 0.847442 7.47244 1.42494 8.04994L6.31494 12.9399" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>

                        :null
                    }
                    {
                      item?.current?
                          <p className="font-semibold text-color flex gap-2 items-center transition "> {item.title} </p>
                        :
                          <Link href={item.href} className="font-semibold text[20px] text-[#3091F2] hover:text-color flex gap-2 items-center transition "> {item.title} </Link>

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
