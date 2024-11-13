import { DefaultBadge } from '@/Components/Cards/Badges'
import SmallCard from '@/Components/Cards/SmallCard'
import { ImageSkeleton } from '@/Components/Common'
import { useGetCaseDetailsMutation } from '@/redux/api/casesApi'
import Link from 'next/link'
import React, { useEffect } from 'react'
import IncludedSessionsTable from './Tables/IncludedSessionsTable'
import { handleCaseBadgeColor } from '@/Components/utils/helper'
import { FaPlusCircle } from 'react-icons/fa'

const LoadingCaseSkeleton = () =>(
    <div className='p-4'>
        <ImageSkeleton 
          height='400px'
          width='100%'
          rounded='10px'
          shadow
          margin='10px 0px'
        />
        <ImageSkeleton 
          height='200px'
          width='100%'
          rounded='10px'
          margin='10px 0px'
          shadow
        />

        <ImageSkeleton 
          height='200px'
          width='100%'
          rounded='10px'
          margin='10px 0px'
          shadow
        />
    </div>
)

interface CaseType{
  case_number:string,
}

const CaseDetails = ({case_number}:{case_number:string}) => {

  const [caseDetails, {isLoading, data}] = useGetCaseDetailsMutation()
  useEffect(()=>{
    if(case_number)
      caseDetails({case_number})
  }, [case_number])
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return (
    <div className='p-5'>
      {
        isLoading?
          <LoadingCaseSkeleton />
        :
          <>
            <div className='bg-card rounded-md'>
                <div className='flex justify-between items-center p-4 rounded-md mb-4'>
                    <div className="font-bold">{data?.case?.case_number}</div>
                    <DefaultBadge 
                      title={data?.case?.state}
                      color={handleCaseBadgeColor(data?.case?.state)}
                    />
                </div>
                {/* BASE DATA */}
                <div className="grid grid-cols-3 items-center gap-3 p-4 rounded-md mb-4">
                  <SmallCard
                    keyName={'تاريخ القضية'}
                    value={data?.case?.date_ar}
                  />
                  <SmallCard 
                    keyName={'رقم القضية'}
                    value={data?.case?.case_number}
                  />
                  <SmallCard 
                    keyName={'حالة القضية'}
                    value={data?.case?.state}
                  />
                  {/* ---------- */}

                  <SmallCard 
                    keyName={'المدينة'}
                    value={data?.case?.city}
                  />
                  <SmallCard 
                    keyName={'المحكمة'}
                    value={data?.case?.court}
                  />
                  <SmallCard 
                    keyName={'رقم الدائرة'}
                    value={data?.case?.circular}
                  />
                </div>

                {/* END BASE DATA */}


                <div className="grid grid-cols-2 items-center gap-3 p-4 rounded-md mb-4">
                  {/* ---------- */}

                  <SmallCard
                    keyName={'نوع القضية'}
                    value={data?.case?.litigation_type}
                  />
                  <SmallCard 
                    keyName={'مبلغ القضية'}
                    value={data?.case?.amount}
                  />
                  
                  {/* ---------- */}
                  <SmallCard 
                    keyName={'نوع العميل'}
                    value={data?.case?.customer?.type}
                  />
                  <SmallCard 
                    keyName={'رقم العميل'}
                    value={data?.case?.customer?.number}
                  />
                  {/* ---------- */}

                  <SmallCard 
                    keyName={'رقم الإتفاقية'}
                    value={data?.case?.agreement_number}
                    />
                  <SmallCard 
                    keyName={'رقم جوال العميل'}
                    value={data?.case?.cust_phone_number}
                  />
                  
                  {/* ---------- */}
                  <SmallCard 
                    keyName={'المدعي'}
                    value={data?.case?.defendant}
                  />
                  <SmallCard 
                    keyName={'المدعي عليه'}
                    value={data?.case?.prosecuter}
                  />
                  {/* ---------- */}
                  {
                    data?.case?.customer?.identity_number?
                      <SmallCard 
                        keyName={'رقم هوية العميل'}
                        value={data?.case?.customer?.identity_number}
                      />
                      :
                      <SmallCard 
                        keyName={'رقم السجل التجاري'}
                        value={data?.case?.customer?.cr_number}
                      />
                  }
                  {/* ---------- */}
                </div>

                <div className="gap-3 p-4 rounded-md mb-4">
                  <SmallCard 
                    keyName={'الملاحظات'}
                    value={data?.case?.notes || 'لا يوجد'}
                  />
                </div>
                <div className="p-4 rounded-md mb-4 block drop-shadow-sm shadow-lg focus:outline-none focus:ring">
                  <p>المرفقات</p>
                  <div className="flex gap-4 items-center">
                    {
                      data?.case?.attachments?.map((attch:string)=>(
                        attch.endsWith('.jpeg')?
                          <img 
                            className='bg-container rounded-xl h-[200px] overflow-hidden p-4 drop-shadow-md'
                            src={process.env.NEXT_PUBLIC_HOST+"/media/"+attch}
                          />
                        :
                          <Link download={attch} className='bg-container rounded-xl h-[100px] overflow-hidden text-center p-4 drop-shadow-md'  href={process.env.NEXT_PUBLIC_HOST+"/media/"+attch} >
                            {attch}
                          </Link>
                      )
                      )
                    }
                  </div>
                </div>
            </div>

            <div className="mt-8 bg-card p-4 rounded-md">
              <div className="flex justify-between">
                <h3 className='font-bold text-lg my-3'>الجلسات</h3>
                <Link className='bg-primary h-fit p-2 rounded-md text-negitaive-color flex items-center gap-3' href={`/cases/${case_number}/sessions/add`}>
                  إضافة جلسة
                  <FaPlusCircle />
                </Link>
              </div>
              <IncludedSessionsTable 
                sessions={data?.case?.sessions}
                case_number={case_number}
              />
            </div>
          </>
      }
    </div>
  )
}

export default CaseDetails
