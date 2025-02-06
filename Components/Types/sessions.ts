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
    can_edit_all_data?: boolean,
    attachments: File[] | null
}


export interface addCosultationType{
    // session     :string,
    message          :  string,
    receiver         :  string
    receiver_name    :  string
    type             :  string
}

export interface cosultationType{
    session:string,
    case_number:string,
    date_ar:string,
    state:string,
    
    sender_name:string,
    receiver_name:string,

    message:string,
    reply:string,
    replied_at:string,

    can_reply:boolean,
    is_sender:boolean,

    stages:Step[]
    
}