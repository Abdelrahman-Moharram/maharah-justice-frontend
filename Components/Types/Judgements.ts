import { DateObject } from "react-multi-date-picker"

export interface JudgementsFormType{
    number: string,
    case_number: string,
    court: string,
    amount:number,
    // date_ar: DateObject | null,
    notes: string,
    result: string,
    is_aganist_company: boolean,
    is_objectionable: boolean,
    is_executable: boolean,
    judgement_attachments: File[] | null
}