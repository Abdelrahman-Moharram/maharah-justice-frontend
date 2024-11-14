export const caseNumberRegex        = '[1-9][0-9]{2,}$'
export const phoneNumberPattern     = '^(9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$'
export const commercialNumberRegex  = '^(1)[0-9]{9}$'
export const hijriDateRegex         = '^([٠-٢]?[٠-٩])-([٠-١]?[٠-٩])-(١[٣-٤][٠-٩][٠-٩]|[١٢][٠-٩][٠-٩][٠-٩])$'
export const judgementNumberPattern = '[1-9][0-9]{2,}$'
export const amountPattern          = '^[0-9]+$'

export const usernamePattern        = '^[a-zA-Z][a-zA-Z0-9_. -]{2,}$'
export const fullNamePattern        = '^[ء-ي][ء-ي ]{5,}$'



export const usernameRegex          = {value:usernamePattern, message:'اسم المستخدم يجب ان يبدأ بأحرف ويحتوي على 3 أحرف على الأقل ولا يحتوي على [+%$#/|\!]'}
export const fullNameRegex          = {value:fullNamePattern, message:'اسم المستخدم باللغة العربية يجب ان يكون كاملا باللغة العربية و بدون ارقام'}
export const phoneNumberRegex       = {value:phoneNumberPattern, message:'يجب أن يحتوي يبدأ رقم الجوال ب (9665|05|5) بالإضافة إلى 7 أرقام أخرى'}
export const judgementNumberRegex   = {value:judgementNumberPattern, message:'رقم الحكم يجب أن يحتوي على أرقام فقط ويحتوي على 3 أرقام أو أكثر'}
export const amountRegex            = {value:amountPattern, message:'يجب أن يحتوي الملبغ على أرقام فقط'}
