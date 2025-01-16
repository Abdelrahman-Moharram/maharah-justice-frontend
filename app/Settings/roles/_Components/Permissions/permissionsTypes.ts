
export interface permissionType {
    has_perm        : boolean
    id              : string
    key             : string
    label           : string
}

export interface moduleType {
    [name:string]   : permissionType[] 
}
