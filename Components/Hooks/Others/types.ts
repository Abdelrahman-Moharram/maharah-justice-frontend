import { DateObject } from "react-multi-date-picker";

export interface caseFilterType{
  search      : string,
  start_date  : DateObject|null;
  end_date    : DateObject|null;
}
  
export interface filterType{
  search?         : string,
  start_date?     : DateObject|null,
  end_date?       : DateObject|null,
  city            : string,
  customer_type   : string,
} 