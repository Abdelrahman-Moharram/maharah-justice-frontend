import { Input } from '@/Components/Forms'
import useExecutionsForm from '@/Components/Hooks/Judgements/useExecutions'
import { useParams } from 'next/navigation'
import React from 'react'

const ExecutionForm = () => {
    const {number}:{number:string} = useParams()
    const {
        form,
        formErrors,
        dropDowns,
        onChange,
        // changeDate,
        selectChange,
        // imageChange,
        changeCheckBox,
        setFormErrors,
        getExecutionAsFormData
    } = useExecutionsForm({judgement_number:number})
  return (
    <form 
        encType='multipart/form-data'
        // onSubmit={formSubmit}
        method='post'
    >
        <div className='grid grid-cols-2 gap-4'>
            <Input 
                type='text'
                labelId='number'
                label='الرقم التنفيذي'
                onChange={onChange}
                value={form?.number}
                required
                errors={formErrors?.number}
            />
            <Input 
                type='text'
                labelId='execution_type'
                label='نوع التنفيذ'
                onChange={onChange}
                value={form?.execution_type}
                required
                errors={formErrors?.execution_type}
            />
        </div>
    </form>
  )
}

export default ExecutionForm
