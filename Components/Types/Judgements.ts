import { DateObject } from "react-multi-date-picker"

export interface JudgementsFormType{
    number: string,
    session: string,
    court: string,
    amount:number,
    date_ar: DateObject | null,
    notes: string,
    result: string,
    is_aganist_company: boolean,
    judgement_attachments: File[] | null
}