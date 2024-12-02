import { baseType, ValidationsType } from "@/Components/Types/Others";
import { ChangeEvent, useState } from "react";
import { DefaultInputValidate } from "../Common/useValidations";

export const useLitigationTypes = () =>{
    const [error, setError] = useState<any>([])
    const [litigationType, setLitigationType] = useState<baseType>({
        id:'',
        name:''
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setError(DefaultInputValidate({name, value, validationSchema}))
        setLitigationType({ ...litigationType, name: value });
    };

    return {
        litigationType,
        onChange,
        error,
        setError,
        setLitigationType
    }
} 

