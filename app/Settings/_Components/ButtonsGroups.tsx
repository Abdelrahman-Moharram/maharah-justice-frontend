import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props{
    editAction:(item:any)=>void, 
    deleteAction:(item:any)=>void,
    item:any
}
export const EditDeleteButtons = ({editAction, deleteAction, item}:Props) => {
  return (
    <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
        <button
            onClick={()=>editAction(item)}
            className="inline-block border-e p-3 text-green-600 hover:bg-gray-50 focus:relative"
            title="تعديل"
        >
            <BiEdit />
        </button>

        <button
            onClick={()=>deleteAction(item)}
            className="inline-block p-3 text-red-600 hover:bg-red-100 focus:relative"
            title="حذف"
        >
            <FaTrash />
        </button>
    </span>
  )
}
