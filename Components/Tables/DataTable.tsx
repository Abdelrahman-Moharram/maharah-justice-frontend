import React from 'react'
import { ImageSkeleton } from '../Common';
import EmptyContent from '../Common/EmptyContent';

interface Props{
    data:any
    options?:(row:any)=>React.ReactNode
    isLoading:boolean
    isOptions?:boolean,
    emptyLinkHref: string
    emptyText: string,
    startOptions?:(row:any)=>React.ReactNode,
    fnKeys:string[]
}


const DataTable = ({options, startOptions, data, isLoading, emptyLinkHref, emptyText, fnKeys, isOptions=false}:Props) => {
    const getHeaders = () =>{
        const cols = []
        if(startOptions?.length){
            cols.push(<th key={0}></th>)
        }
        if (data?.length > 0){
            for(let i in data[0]){
                if(!fnKeys || !fnKeys.includes(i))
                    cols.push(i)
            }
        }
        if(options?.length){
            cols.push(<th key={-1}></th>)
        }
        return cols
    }
    

    
    const renderRow = ({row}:{row: any})=>{
        const rendered_row = []
        for(let cell in row){
            if(typeof row === 'object' && Object.keys(row).includes(cell) && (!fnKeys || !fnKeys.includes(cell))){
                rendered_row.push(<td className="whitespace-nowrap px-4 py-2 ">{row[cell]||<div className='text-center'>-</div>}</td>)
            }
        }
        return rendered_row
    }
    
  return (
    <div className="overflow-x-auto overflow-y-hidden">
        {
            isLoading?
                <ImageSkeleton 
                    height='800px'
                    width='100%'
                    shadow
                    rounded='10px'
                />
            :
                data?.length?
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-container text-color text-sm">
                        <thead className="ltr:text-left rtl:text-right font-bold">
                            <tr>
                                {
                                    getHeaders()?.map((col, idx)=>(
                                        <th key={idx} className="whitespace-nowrap px-4 py-2 font-medium ">{col}</th>
                                    ))
                                }
                                {/* {
                                    isOptions && options?
                                        <th className="px-4 py-2"></th>
                                    :null
                                } */}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                data?.map((row:any, index:number)=>(
                                        <tr key={index+"-"+Math.random()*20}>
                                            {
                                                isOptions && startOptions?
                                                    <td className="whitespace-nowrap px-4 py-2">
                                                        {startOptions(row?.id)}
                                                    </td>
                                                :null
                                            }
                                            {
                                                renderRow({row})
                                            }
                                            {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td> */}
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
                        title={emptyText}
                    />
                </div>
        }
    </div>
  )
}

export default DataTable
