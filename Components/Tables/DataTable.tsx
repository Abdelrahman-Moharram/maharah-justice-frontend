import React from 'react'
import { ImageSkeleton } from '../Common';

interface row{
    label:string;
    key:string
}
interface Props{
    data:string[]
    cols_mapper:row[]
    options?: boolean
    isLoading:boolean
}


const DataTable = ({options, data, cols_mapper, isLoading}:Props) => {
    
    const cols = cols_mapper.forEach(item=>item.key)

    type RowType = Record<keyof typeof cols, string>;
    const renderRow = ({row}:{row:RowType})=>{
        const rendered_row = []
        for(let col of cols_mapper){
            if(Object.keys(row).includes(col.key)){
                rendered_row.push(<td className="whitespace-nowrap px-4 py-2 text-gray-700">{row[col.key]}</td>)
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
                                cols_mapper?.map(col=>(
                                    <th key={col.key} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{col.label}</th>
                                ))
                            }
                            {
                                options?
                                    <th className="px-4 py-2"></th>
                                :null
                            }
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {
                            data?.map((row, index)=>(
                                <tr key={index+"-"+row[0]}>
                                    {
                                        renderRow({row})
                                    }
                                    {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td> */}
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <a
                                            href="#"
                                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        }
    </div>
  )
}

export default DataTable
