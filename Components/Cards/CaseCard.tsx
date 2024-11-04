import React, { useState } from 'react'
import { WideBadge } from './Badges'
import { handleCaseBadgeColor } from '../utils/helper'
import BasicCard from './BasicCard'
import { caseHomeCardType } from '../Types/case'
import CaseDetailsOverLay from '@/app/cases/_Components/CaseDetailsOverLay'

interface Props{
    handleDetailsModal:()=>void,
    handleCaseNumber:(case_number:string)=>void,
    Case:caseHomeCardType
}
const CaseCard = ({Case, handleDetailsModal, handleCaseNumber}:Props) => {
    const handleModal = ()=>{
        handleCaseNumber(Case?.case_number)
        handleDetailsModal()
    }
  return (
    <>
        
        <div className="bg-card p-5 rounded-lg cursor-pointer" onClick={handleModal}>
            <div className="flex justify-between">
            <p>قضية رقم: {Case?.case_number}</p>
            <WideBadge 
                title={Case.state}
                color={handleCaseBadgeColor(Case.state)}
            />
            </div>
            <div className="grid grid-cols-4 gap-6 my-5">
                <BasicCard
                    title="رقم العميل"
                    value={Case?.case_number}
                    cardBg="bg-container"
                    textcolor="text-color"
                    textSize="16px"
                />
                <BasicCard
                    title="التاريخ"
                    value={Case?.date_ar}
                    cardBg="bg-container"
                    textcolor="text-color"
                    textSize="16px"
                />
                <BasicCard
                    title="المدينة"
                    value={Case?.city}
                    cardBg="bg-container"
                    textcolor="text-color"
                    textSize="16px"
                />
                <BasicCard
                    title="المبلغ"
                    value={Case?.amount}
                    cardBg="bg-container"
                    textcolor="text-color"
                    textSize="16px"
                />
            </div>
            <div className="grid grid-cols-2 gap-6">
            <BasicCard
                title="المدعي"
                value={Case?.prosecuter}
                cardBg="bg-container"
                textcolor="text-color"
                textSize="16px"
            />
            <BasicCard
                title="المدعى عليه"
                value={Case?.defendant}
                cardBg="bg-container"
                textcolor="text-color"
                textSize="16px"
            />
            </div>
        </div>
    </>
  )
}

export default CaseCard
