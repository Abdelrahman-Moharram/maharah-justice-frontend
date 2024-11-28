
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
    attachments: File[] | null
}