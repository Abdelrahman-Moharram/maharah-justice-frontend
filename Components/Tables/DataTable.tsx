import React from 'react'
import { ImageSkeleton } from '../Common';
import EmptyContent from '../Common/EmptyContent';
import { numberToMoney } from '../utils/helper';
import TableSkeleton from './TableSkeleton';

interface Props{
    data:any
    options?:(row:any)=>React.ReactNode
    isLoading:boolean
    isOptions?:boolean,
    emptyLinkHref: string
    emptyText: string,
    startOptions?:(row:any)=>React.ReactNode,
    fnKeys:string[]
    optionsHeader?:string
    startOptionsHeader?:string,
    amounts?:string[],
    showCounter?:boolean
}


const DataTable = ({options, startOptions, data, isLoading, emptyLinkHref, amounts, emptyText, fnKeys, isOptions=false, optionsHeader,  startOptionsHeader, showCounter}:Props) => {
    const getHeaders = () =>{
        const cols = []
        if(startOptions?.length){
            cols.push(<th key={0}>{startOptionsHeader}</th>)
        }
        if (data?.length > 0){
            for(let i in data[0]){
                if(!fnKeys || !fnKeys.includes(i))
                    cols.push(i)
            }
        }
        if(options?.length){
            cols.push(<th key={-1}>{optionsHeader}</th>)
        }
        return cols
    }
    
    const showCellWithOverLay = (cellContent:string) =>{
        const modifiedValue = cellContent.slice(0, 33) + " ..."
        
        return(
            <div className="cursor-default large-table-cell">
                {modifiedValue}
                <div className="absolute top-0 drop-shadow-lg">
                    <span className="  text-sm whitespace-normal block bg-container p-4 rounded-lg ">
                        {
                            cellContent
                        }
                    </span>
                </div>
            </div>
        )
    }
    
    const renderRow = ({row}:{row: any})=>{
        const rendered_row = []
        for(let cell in row){
            if(typeof row === 'object' && Object.keys(row).includes(cell) && (!fnKeys || !fnKeys.includes(cell))){
                rendered_row.push(<td className="whitespace-nowrap px-4 py-2 ">
                    {
                        amounts?.includes(cell)?
                            numberToMoney(row[cell])
                        :
                            row[cell]?.length > 25 ?
                                showCellWithOverLay(row[cell])
                            :
                            row[cell] || <span className='text-center block'>-</span>
                    }
                </td>
            )}
        }
        return rendered_row
    }
    
  return (
    <div className="overflow-x-auto overflow-y-hidden min-h-max">
        {
            isLoading?
                <TableSkeleton />
            :
                data?.length?
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-container text-color text-sm relative">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                {
                                    showCounter?
                                        <td className='mx-2'>مسلسل</td>
                                    :null
                                }
                                {
                                    getHeaders()?.map((col, idx)=>(
                                        <th key={idx} className="whitespace-nowrap px-4 py-2 font-bold ">{col}</th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                data?.map((row:any, index:number)=>(
                                        <tr key={index+"-"+String(Math.random()*200)}>
                                            {
                                                isOptions && startOptions?
                                                    <td className="whitespace-nowrap px-4 py-2">
                                                        {startOptions(row)}
                                                    </td>
                                                :null
                                            }
                                            {
                                                showCounter?
                                                    <td className='mx-2'>{index+1}</td>
                                                :null
                                            }
                                            {
                                                renderRow({row})
                                            }
                                            {
                                                isOptions && options?
                                                    <td className="whitespace-nowrap px-4 py-2">
                                                        {options(row)}
                                                    </td>
                                                :null
                                            }
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                :
                <div className="flex justify-center">
                    <EmptyContent 
                        href={emptyLinkHref}
                        // title={emptyText}
                    />
                </div>
        }
    </div>
  )
}

export default DataTable
