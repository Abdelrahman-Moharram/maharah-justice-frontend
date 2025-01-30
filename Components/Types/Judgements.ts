import { DateObject } from "react-multi-date-picker";

export interface JudgementsFormType{
    number: string,
    case_number: string,
    court: string,
    amount:number,
    // date_ar: DateObject | null,
    notes: string,
    result: string,
    last_date_to_appeal:DateObject | null,
    is_aganist_company: boolean,
    is_objectionable: boolean,
    is_executable: boolean,
    attachments: File[] | null,
}