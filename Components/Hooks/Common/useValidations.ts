import { ValidationsType } from "@/Components/Types/Others"
import { DateObject } from "react-multi-date-picker"

interface DefaultInputProps{
    name: string,
    value:string|number|boolean|DateObject, 
    validationSchema:ValidationsType,
    alter_name?:string
}
const defaultMaxValueError = (name:string, maxValue:number, alter_name?:string)=> `قيمة ${alter_name||name} لايجب أن تكون أكبر من ${maxValue}`
const defaultMinValueError = (name:string, MinValue:number, alter_name?:string)=> `قيمة ${alter_name||name} لايجب أن تكون أقل من ${MinValue}`
const defaultMaxLengthError = (name:string, maxLength:number, alter_name?:string)=> `لا يجب أن يكون ${alter_name||name} أقل من ${maxLength} أحرف`
const defaultMinLengthError = (name:string, minLength:number, alter_name?:string)=> `لا يجب أن يكون ${alter_name||name} أكبر من ${minLength} أحرف`

export const DefaultInputValidate = ({name, value, validationSchema}:DefaultInputProps) =>{    
    // const errors = []
    if(typeof(value) === 'number'){
        if (validationSchema.maxValue && value > validationSchema?.maxValue?.value){
            return [validationSchema?.maxValue?.message || defaultMaxValueError(name, validationSchema?.maxValue?.value)]
        }
        if (validationSchema.minValue && value > validationSchema?.minValue?.value){
            return [validationSchema?.minValue?.message || defaultMinValueError(name, validationSchema?.minValue?.value)]
        }
    }

    if(validationSchema?.maxLength && value.toString().length > validationSchema.maxLength.value){
        return [validationSchema?.maxLength?.message || defaultMaxLengthError(name, validationSchema?.maxLength?.value, validationSchema.alter_name)]
    }
    if(validationSchema?.minLength && value.toString().length > validationSchema.minLength.value){
        return [validationSchema?.minLength?.message || defaultMinLengthError(name, validationSchema?.minLength?.value, validationSchema.alter_name)]
    }

    if(validationSchema?.regex?.value){
        
        const re = new RegExp(validationSchema?.regex?.value)
        if(re.test(value.toString()) === false){
            return [validationSchema?.regex?.message || `برجاء إدخال قيمة ${name} صحيحة`]
        }
    }

    return undefined

} 


export const isErrorsList = (errors:any) =>{
    for(let key in errors){
        if(errors[key])
            return true
    }
    return false
}