import Time from "react-datepicker/dist/time"
import { DateObject } from "react-multi-date-picker"

export interface SessionFormType{
    case_number: string,
    court: string,
    city: string,
    state: string,
    date_ar: DateObject | null,
    date?: string,
    time: Time | null,
    link: string,
    next_session_req: string,
    notes: string,
    record: string,
    defenses: string,
    lawyer: string,
    alterlawyer: string,
    lawyer_name: string,
    alterlawyer_name: string,
    session_attachments: File[] | null
}