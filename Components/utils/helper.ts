import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

export const handleCaseBadgeColor = (state:string) =>{
    
    if (state === 'منتهية')
        return '#3091F2'
    else if (state === 'قيد النظر')
        return '#F27E30'
    else if (state === 'مشطوبة')
        return '#C91010'
    else if (state === 'منتهي بعدم السداد')
        return '#B81313'
    else if (state === 'قرار 34' || state === 'قرار 46')
        return '#6B13B8'
    else if (state === 'منتهي بالسداد' || state === 'حكم')
        return '#13B860'
    else if (state === 'بيع عقار أو منقول')
        return '#D7A80D'
    else if (state === 'رهن عقاري')
        return '#F27E30'
    else
        return '#7E7E7E'
}


export const to_int_or_default = (val:string|null)=>{
    try{
        if(val)
            return parseInt(val)
    }
    catch{
    }
    return 0
}


export const numberToMoney = (value:number|string|null) =>{
    if (!value) return ''
    let intValue = value.toLocaleString().replace(/[^0-9.]/g, '');
    const parts = intValue.split('.');
    if (parts.length > 2) {
        intValue = parts[0] + '.' + parts.slice(1).join('');
    }

    const [integerPart, decimalPart] = intValue.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}


export const exportData = ({type, params, ExportFun, fileName}:{type:'excel'| 'pdf', params:any, ExportFun:any, fileName:string}) => {
    let ext = ''
    if (type === 'pdf')
      ext = 'pdf'
    else if (type === 'excel' || type === 'xlsx')
      ext = 'xlsx' 
    ExportFun({type, ...params})
    .unwrap()
    .then((res:any)=>{        
      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  };

export const beautify_date = (date:string) => {
    const newDate = new Date(date)
    return newDate.toUTCString()
}

export function updateSearchQuery (updatedQuery:any, pathname:string, router:AppRouterInstance, params:URLSearchParams ){
    
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    params.set('size', '10');
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
};

export function capitalizeFirstLetter(val:string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}