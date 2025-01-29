import { DateObject } from "react-multi-date-picker";

export interface caseFilterType{
    search      : string,
    start_date  : DateObject|null;
    end_date    : DateObject|null;
  }
  
  