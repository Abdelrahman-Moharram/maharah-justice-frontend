import { DateObject } from "react-multi-date-picker"

export interface ExecutionFormType{
    number:string
    city:string
    state:string
    execution_type:string
    action:string
    notes:string
    date_ar: DateObject | null,
}