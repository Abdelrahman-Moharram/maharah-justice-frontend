import { baseType, ValidationsType } from "@/Components/Types/Others";
import { ChangeEvent, useState } from "react";
import { DefaultInputValidate } from "../Common/useValidations";

export const useCaseStates = () =>{
    const [error, setError] = useState<any>([])
    const [caseState, setCaseState] = useState<baseType>({
        id:'',
        name:''
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setError(DefaultInputValidate({name, value, validationSchema}))
        setCaseState({ ...caseState, name: value });
    };

    return {
        caseState,
        onChange,
        error,
        setError,
        setCaseState
    }
} 


