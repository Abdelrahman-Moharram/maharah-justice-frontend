import { ChangeEvent, useState } from "react";
import { ValidationsType } from "../Types/Others";
import { DefaultInputValidate } from "./Common/useValidations";
interface baseType{
    id?:string,
    name:string
}
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