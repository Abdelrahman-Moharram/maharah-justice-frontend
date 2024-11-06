import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

interface Props{
    editAction:(id:string)=>void, 
    deleteAction:(id:string)=>void,
    id:string
}
export const EditDeleteButtons = ({editAction, deleteAction, id}:Props) => {
  return (
    <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
        <button
            onClick={()=>editAction(id)}
            className="inline-block border-e p-3 text-green-600 hover:bg-gray-50 focus:relative"
            title="تعديل"
        >
            <BiEdit />
        </button>

        <button
            onClick={()=>deleteAction(id)}
            className="inline-block p-3 text-red-600 hover:bg-red-100 focus:relative"
            title="حذف"
        >
            <FaTrash />
        </button>
    </span>
  )
}
