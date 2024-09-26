import { LoginForm } from '@/Components/Forms'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="h-screen overflow-hidden grid lg:grid-cols-2">
        <div className='lg:col-span-1 col-span-2 p-5'>
            <div className=" p-5 mb-100px">
                <Image 
                    src={'/logo-gray.png'}
                    alt='logo'
                    width={100}
                    height={40}
                    className=''
                />
            </div>
            <div className="mt-10 w-[80%] mx-auto">
                <h4 className='my-5 font-semibold'>
                نظام العدالة
                </h4>
                <LoginForm />
            </div>
        </div>
        <div className="lg:col-span-1 lg:block hidden">
            <Image 
                src={'/loginLogo.png'}
                alt='login image'
                width={1300}
                height={1400}
                className='w-full h-full'
            />
        </div>
    </div>
  )
}

export default page
