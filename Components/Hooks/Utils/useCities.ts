import { baseType, ValidationsType } from "@/Components/Types/Others";
import { ChangeEvent, useState } from "react";
import { DefaultInputValidate } from "../Common/useValidations";

export const useCities = () =>{
    const [error, setError] = useState<any>([])
    const [city, setCity] = useState<baseType>({
        id:'',
        name:''
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setError(DefaultInputValidate({name, value, validationSchema}))
        setCity({ ...city, name: value });
    };
    return {
        city,
        onChange,
        error,
        setError,
        setCity
    }
}
 