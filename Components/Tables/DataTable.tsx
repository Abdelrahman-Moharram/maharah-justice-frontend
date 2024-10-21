import React from 'react'
import { ImageSkeleton } from '../Common';
import EmptyContent from '../Common/EmptyContent';

interface Props{
    data:any
    options?:(id:string)=>React.ReactNode
    isLoading:boolean
    isOptions?:boolean,
    emptyLinkHref: string
    emptyText: string,
    startOptions?:(id:string)=>React.ReactNode
}


const DataTable = ({options, startOptions, data, isLoading, emptyLinkHref, emptyText, isOptions=false}:Props) => {
    const getHeaders = () =>{
        const cols = []
        if(startOptions?.length){
            cols.push(<th key={0}></th>)
        }
        if (data?.length > 0){
            for(let i in data[0]){
                if(i !== 'id')
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
            if(typeof row === 'object' && Object.keys(row).includes(cell) && cell != 'id'){
                rendered_row.push(<td className="whitespace-nowrap px-4 py-2 text-gray-700">{row[cell]}</td>)
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
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                {
                                    getHeaders()?.map((col, idx)=>(
                                        <th key={idx} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{col}</th>
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
                                        <tr key={index+"-"+row}>
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
                                                        {options(row?.id)}
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
