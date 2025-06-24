import Link from 'next/link'
import React from 'react'

interface props{
    children: React.ReactNode;
    href: string
}
const ButtonLink = ({children, href}:props) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 w-fit rounded-sm border bg-secondry transition-all hover:bg-primary-hover px-12 py-3 text-sm font-medium text-white focus:outline-hidden focus:ring-3 active:text-indigo-500"
    >
    {children}
    </Link>
  )
}

export default ButtonLink
