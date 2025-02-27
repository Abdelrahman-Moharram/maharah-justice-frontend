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
            variant='primary'
        />
        <Button 
            onClick={cancelAction}
            title={cancelTitle} 
            isLoading={cancelLoading}
            variant='secondary'
        />
    </div>
  )
}

export default SaveCancelButtonGroup
