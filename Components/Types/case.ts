import { DateObject } from "react-multi-date-picker";

export interface caseHomeCardType{
    case_number: string,
    customer_number: string,
    date_ar: string,
    city: string,
    amount: string,
    prosecuter: string,
    defendant: string,
    state: string
}

export interface CaseFormType{
    case_number:  string;
    agreement_number: string;
    amount: string;
    notes:  string;
    is_aganist_company: boolean;
    court:  string;
    circular: string;
    city: string;
    state:  string;
    litigation_type:  string;
    company_representative: string;
    customer: string;
    cust_phone_number:  string;
    commercial_number:  string;
    date_ar:  DateObject|null;
    case_attachment?: File[] | null,
    customer_name:''
  }