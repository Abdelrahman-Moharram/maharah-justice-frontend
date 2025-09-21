import { LoginForm } from '@/Components/Forms'
import React from 'react'

const page = () => {
    
    
    
    
  return (
    <main className="flex  justify-center items-center min-h-screen bg-login-image bg-cover bg-bottom">
        <div className="rounded-lg w-fit h-fit bg-container py-20 drop-shadow-2xl login-container px-20">
            <div className="flex justify-center mb-12">
            <div>
                Maharah
            </div>
            </div>
            <div className="mx-auto w-[540px]">
                <h4 className='my-5 text-[36px] font-semibold'>
                    نظام العدالة
                </h4>
                <LoginForm />
            </div>
            
        </div>
    </main>
  )
}

export default page
