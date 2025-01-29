  
const pageFilters:{[key:string]:string[]} = {
    '/reports/cases':['date', 'city'], 
    '/reports/sessions':['date', 'city'], 
    '/reports/closed-cases':['date', 'city'], 
    '/reports/judgement-cases':['date', 'city', 'customer_type']
}

export const getPageFilter = (path:string) =>{
    if (Object.keys(pageFilters).includes(path))
        return pageFilters[path]
    return []
}