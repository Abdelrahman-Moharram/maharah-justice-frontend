import { ChangeEvent, useState } from "react";
import { DefaultInputValidate } from "../Common/useValidations";
import { baseType, ValidationsType } from "@/Components/Types/Others";

export const useRoles = () =>{
    const [error, setError] = useState<any>([])
    const [form, setForm] = useState<baseType>({
        id:'',
        name:''
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setError({...error, [name]:DefaultInputValidate({name, value, validationSchema})})
        setForm({ ...form, name: value });
    };

    const getAsFormData = () =>{
        
        const formData = new FormData()
        if(form?.id)
            formData.append('id', form.id)
        formData.append('name', form.name)

        return formData
    }

    return {
        form,
        onChange,
        error,
        setError,
        setForm,
        getAsFormData
    }
} 