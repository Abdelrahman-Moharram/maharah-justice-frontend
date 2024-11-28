import { DateObject } from "react-multi-date-picker";

export interface appealFormType{
    id?:string,
    judgement:string,
    date_ar: DateObject | null,
    city:string,
    court:string,
    result:string,
}