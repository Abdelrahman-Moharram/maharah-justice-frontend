
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
    return null
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