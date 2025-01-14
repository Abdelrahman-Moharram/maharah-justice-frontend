'use client'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import Paginition from '@/Components/Lists/Paginition'
import DataTable from '@/Components/Tables/DataTable'
import { to_int_or_default } from '@/Components/utils/helper'
import { useGetCustomerListQuery, useSwitchCustomerStatusMutation } from '@/redux/api/utilsApi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaPlusCircle } from 'react-icons/fa'
import CustomerFormOverLay from './_Components/CustomerFormOverLay'
import { toast } from 'react-toastify'
import SwitchInputField from '@/Components/Forms/SwitchInputField'

const BreadcrumbData = [
    {
      href: '/',
      title: 'الصفحة الرئيسية',
    },
    {
      href: '/settings/customers',
      title: 'إعدادات العملاء',
      current:true
    }
  ]
const page = () => {

    const [showOverLay, setShowOverLay] = useState(false)
    const [customerId, setCustomerId] = useState('')
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    
    let size = to_int_or_default(searchParams.get("size")) 
    let page = to_int_or_default(searchParams.get("page")) 
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        return params.toString()
        },
        [searchParams]
    )

    const handleOverLay = () =>{
        if(customerId)
            setCustomerId('')
        setShowOverLay(!showOverLay)
      }
    if(!size){
        size = 10
        router.push(pathname + '?' + createQueryString('size', '10'))
    }
    if(!page){
        page = 1
        router.push(pathname + '?' + createQueryString('page', "1"))
    }
    
    const {data, isLoading} = useGetCustomerListQuery({page, size})
    const [switchCustomerStatus] = useSwitchCustomerStatusMutation()

    const handleCustomerStatus = (customer_id:string) =>{
      switchCustomerStatus({customer_id})
        .unwrap()
        .then(res=>{
          toast.success(res?.message || 'تم تغيير حالة العميل')
        }).catch(err=>{
          console.log(err);
          toast.error(err?.message || 'حدث خطأ ما أثناء تغيير حالة العميل')
        })
    }

    


    const options = (row:any)=>(
      <div className='flex items-center'>
        <div className="scale-[60%] h-fit w-fit">
          <SwitchInputField 
            checked={row?.is_active}
            handleCheck={()=>handleCustomerStatus(row.id)}
          />
        </div>
        <button onClick={()=>{handleOverLay();setCustomerId(row?.id)}} className=' text-blue-600 text-xl transition-all rounded-full' ><BiEdit /></button>
      </div>
    )
  return (
    <>
        <CustomerFormOverLay
            handleOpen={()=>{handleOverLay();setCustomerId('')}}
            open={showOverLay}
            customerId={customerId}
        />
        <div className='px-4'>
            <div className="my-8 flex justify-between items-center">
              <Breadcrumb
                items={BreadcrumbData}
              />
            <button 
                onClick={handleOverLay}
                className="px-8 bg-primary hover:bg-primary/90 transition-all h-fit p-2 rounded-md text-negitaive-color flex items-center gap-3"
                >
                <FaPlusCircle /> 
                إضافة عميل 
            </button>
            </div>

            <DataTable
              data={data?.customers}
              isLoading={isLoading}
              fnKeys={['id', 'is_active']}
              emptyLinkHref='/settings/customers'
              emptyText='صفحة إعدادات المستخدمين'
              isOptions
              options={options}
            />
            <div className='flex justify-center my-10 font-extrabold'>
              <Paginition
                totalPages={data?.total_pages}
              />
            </div>
        </div> 
    </>
  )
}

export default page
