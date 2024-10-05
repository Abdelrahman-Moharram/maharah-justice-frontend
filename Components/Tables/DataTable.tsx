import React from 'react'
import { ImageSkeleton } from '../Common';

interface Props{
    data:{}[]
    options?:(id:string)=>React.ReactNode
    isLoading:boolean
    isOptions?:boolean
}


const DataTable = ({options, data, isLoading, isOptions=false}:Props) => {
    const getHeaders = () =>{
        const cols = []
        if (data?.length > 0){
            for(let i in data[0]){
                if(i !== 'id')
                    cols.push(i)
            }
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
                    height='400px'
                    width='100%'
                    shadow
                    rounded='10px'
                />
            :
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            {
                                getHeaders()?.map(col=>(
                                    <th key={col} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{col}</th>
                                ))
                            }
                            {
                                isOptions && options?
                                    <th className="px-4 py-2"></th>
                                :null
                            }
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            data?.map((row, index)=>(
                                    <tr key={index+"-"+row}>
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
        }
    </div>
  )
}

export default DataTable
