import React from 'react'
import Button from '../Button'

interface Props{
    saveTitle?:string,
    saveAction?:()=>void,
    saveSubmit?:boolean
    saveLoading?: boolean,

    cancelAction:()=>void,
    cancelTitle?:string,
    cancelLoading?: boolean,
}
const SaveCancelButtonGroup = ({
    saveTitle='حفظ', 
    saveSubmit, 
    saveAction, 
    saveLoading=false,

    cancelTitle='إلغاء', 
    cancelAction, 
    cancelLoading=false, 
}:Props) => {
  return (
    <div className="rounded-lg shadow-lg mx-auto flex gap-2 p-5 drop-shadow-md bg-container">
        <Button 
            onClick={saveAction}
            submit={saveSubmit} 
            title={saveTitle} 
            isLoading={saveLoading} 
            className='bg-primary hover:bg-transparent border-primary' 
        />
        <Button 
            onClick={cancelAction}
            title={cancelTitle} 
            isLoading={cancelLoading}
            className='w-full py-2 rounded-lg border border-secondary text-center hover:bg-secondary hover:text-white transition-all'
        />
    </div>
  )
}

export default SaveCancelButtonGroup
