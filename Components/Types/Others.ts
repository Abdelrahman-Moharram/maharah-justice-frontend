export interface ValidationsType{
    regex?: {value:string, message:string},
    maxValue?:{value:number, message?:string},
    minValue?:{value:number, message?:string},
    maxLength?:{value:number, message?:string},
    minLength?:{value:number, message?:string},
    alter_name?:string
}

export interface baseType{
    id?:string,
    name:string
}
