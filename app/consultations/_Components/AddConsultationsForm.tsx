import LawyerSearchInput from '@/app/sessions/_Components/Inputs/LawyerSearchInput'
import { SaveCancelButtonGroup } from '@/Components/Common'
import { TextArea } from '@/Components/Forms'
import { useAddConsultationsForm } from '@/Components/Hooks/Sessions/useSessionForm'
import { useAddConsultationMutation } from '@/redux/api/sessionsApi'
import React, { FormEvent } from 'react'
import { toast } from 'react-toastify'

const AddConsultationsForm = ({session_id, cancelAction}:{session_id:string, cancelAction:()=>void}) => {
    const [AddConsultation] = useAddConsultationMutation()
    const {
        form,
        formErrors,
        getAsFormData,
        onChange,
        setFormErrors,
        changeLawyer
    } = useAddConsultationsForm({session_id})

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault()
        AddConsultation({session_id, form:getAsFormData()})
            .unwrap()
            .then(data=>{
                toast.success(data?.message)
                cancelAction()
              })
              .catch((err:any)=>{     
                console.log(err);
                if(err.data.errors)
                  setFormErrors(err.data.errors)
                if(err.data.message)
                  toast.error(err.data.message)
              })
    }
  return (
    <div className="">
        <h4 className='font-bold'>إضافة إاستشارة</h4>
        <form onSubmit={handleSubmit} className="px-2 mt-10 space-y-10">
            <div className="mb-3">
                <LawyerSearchInput 
                    type='text'
                    labelId='receiver'
                    label='المستشار'
                    onChange={changeLawyer}
                    oldNameValue={form.receiver_name}
                    errors={formErrors?.receiver}
                    is_consultant
                    required
                />
            </div>

            <div className="">
                <TextArea 
                    labelId='message'
                    label='الإستشارة'
                    onChange={onChange}
                    value={form?.message}
                    required={false}
                    errors={formErrors?.message}
                />
            </div>

            <SaveCancelButtonGroup
                saveSubmit
                cancelAction={cancelAction}
            />
        </form>
    </div>
  )
}

export default AddConsultationsForm
