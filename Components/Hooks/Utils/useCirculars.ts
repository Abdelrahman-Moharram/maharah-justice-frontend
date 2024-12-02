import { ChangeEvent, useState } from "react";
import { ValidationsType } from "../../Types/Others";
import { DefaultInputValidate } from "../Common/useValidations";










interface circularType{
    id?:string,
    name:string
}
export const useCirculars = () =>{
    const [error, setError] = useState<any>([])
    const [circular, setCircular] = useState<circularType>({
        id:'',
        name:''
    })
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, validationSchema?:ValidationsType ) => {
        const { name, value } = event.target;
        if(validationSchema)
            setError(DefaultInputValidate({name, value, validationSchema}))
        setCircular({ ...circular, name: value });
    };

    return {
        circular,
        onChange,
        error,
        setError,
        setCircular
    }
} 
