import { baseType, ValidationsType } from "@/Components/Types/Others";
import { ChangeEvent, useState } from "react";
import { DefaultInputValidate } from "../Common/useValidations";

export const useCourts = () =>{
    const [error, setError] = useState<any>([])
    const [court, setCourt] = useState<baseType>({
        id:'',
        name:''
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setError(DefaultInputValidate({name, value, validationSchema}))
        setCourt({ ...court, name: value });
    };

    return {
        court,
        onChange,
        error,
        setError,
        setCourt
    }
} 